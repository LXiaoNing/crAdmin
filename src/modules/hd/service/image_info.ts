import { Init, Provide } from '@midwayjs/decorator';
import { BaseService } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { HdImageInfoEntity } from '../entity/image_info';

/**
 * hd模块-图片信息
 */
@Provide()
export class HdImageInfoService extends BaseService {
  @InjectEntityModel(HdImageInfoEntity)
  hdImageInfo: Repository<HdImageInfoEntity>;

  @Init()
  async init() {
    await super.init();
    this.setEntity(this.hdImageInfo);
  }
}
