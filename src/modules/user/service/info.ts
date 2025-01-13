import { BaseService, CoolCommException } from '@cool-midway/core';
import { Inject, Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/typeorm';
import * as md5 from 'md5';
import { Equal, Repository } from 'typeorm';
import { v1 as uuid } from 'uuid';
import { PluginService } from '../../plugin/service/info';
import { UserInfoEntity } from '../entity/info';
import { UserSmsService } from './sms';
import { UserLoginService } from './login';
import { UserWxService } from './wx';
import { v4 as uuidv4 } from 'uuid';

/**
 * 用户信息
 */
@Provide()
export class UserInfoService extends BaseService {
  @InjectEntityModel(UserInfoEntity)
  userInfoEntity: Repository<UserInfoEntity>;

  @Inject()
  pluginService: PluginService;

  @Inject()
  userSmsService: UserSmsService;

  @Inject()
  UserLoginService: UserLoginService;

  @Inject()
  userWxService: UserWxService;

  /**
   * 绑定小程序手机号
   * @param userId
   * @param code
   * @param encryptedData
   * @param iv
   */
  async miniPhone(userId: number, code: any, encryptedData: any, iv: any) {
    const phone = await this.userWxService.miniPhone(code, encryptedData, iv);
    await this.userInfoEntity.update({ id: Equal(userId) }, { phone });
    return phone;
  }

  /**
   * 获取用户信息
   * @param id
   * @returns
   */
  async person(id) {
    const info = await this.userInfoEntity.findOneBy({ id: Equal(id) });
    console.log('info',info);
    delete info.password;
    return info;
  }
/**
 * 注册
 * @param param

 * */
  async register(param) {
    // 生成一个UUID
        const uuid = uuidv4();
        // 默认账号名密码为uuid
      console.log('param',param);
        param.nickName = uuid;
        param.password = md5(uuid);
        param.unionid = uuid;
        
    // const info = await this.userInfoEntity.findOneBy({ phone: Equal(phone) });
    // if (info) throw new CoolCommException('手机号已存在');
    // const sms = await this.userSmsService.checkCode(phone, code);
    // if (!sms) throw new CoolCommException('验证码错误');
    // await this.userInfoEntity.insert({
    //   password: md5(param.username),
    //   status: 1,  // 1正常 2注销  
    // })
    let user=await this.userInfoEntity.save({
      ...param,
       status: 1,  // 1正常 2注销  
     })
     return this.UserLoginService.token(user);
   }
    
    
  /**
   * 注销
   * @param userId
   */
  async logoff(userId: number) {
    await this.userInfoEntity.update(
      { id: userId },
      {
        status: 2,
        phone: null,
        unionid: null,
        nickName: `已注销-00${userId}`,
        avatarUrl: null,
      }
    );
  }

  /**
   * 更新用户信息
   * @param id
   * @param param
   * @returns
   */
  async updatePerson(id, param) {
    const info = await this.person(id);
    if (!info) throw new CoolCommException('用户不存在');
    try {
      // 修改了头像要重新处理
      if (param.avatarUrl && info.avatarUrl != param.avatarUrl) {
        const file = await this.pluginService.getInstance('upload');
        param.avatarUrl = await file.downAndUpload(
          param.avatarUrl,
          uuid() + '.png'
        );
      }
    } catch (err) {}
    try {
      return await this.userInfoEntity.update({ id }, param);
    } catch (err) {
      throw new CoolCommException('更新失败，参数错误或者手机号已存在');
    }
  }

  /**
   * 更新密码
   * @param userId
   * @param password
   * @param 验证码
   */
  async updatePassword(userId, password, code) {
    const user = await this.userInfoEntity.findOneBy({ id: userId });
    const check = await this.userSmsService.checkCode(user.phone, code);
    if (!check) {
      throw new CoolCommException('验证码错误');
    }
    await this.userInfoEntity.update(user.id, { password: md5(password) });
  }

  /**
   * 绑定手机号
   * @param userId
   * @param phone
   * @param code
   */
  async bindPhone(userId, phone, code) {
    const check = await this.userSmsService.checkCode(phone, code);
    if (!check) {
      throw new CoolCommException('验证码错误');
    }
    await this.userInfoEntity.update({ id: userId }, { phone });
  }
}
