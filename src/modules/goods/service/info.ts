import { Init, Provide } from '@midwayjs/decorator';
import { BaseService } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { GoodsInfoEntity } from '../entity/info';

/**
 * goods模块-商品信息
 */
@Provide()
export class GoodsInfoService extends BaseService {
  @InjectEntityModel(GoodsInfoEntity)
  goodsInfoEntity: Repository<GoodsInfoEntity>;

  @Init()
  async init() {
    await super.init();
    this.setEntity(this.goodsInfoEntity);
  }
}
