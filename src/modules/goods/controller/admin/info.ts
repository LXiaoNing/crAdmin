import { CoolController, BaseController } from '@cool-midway/core';
import { Body, Inject, Post, Get, Query } from '@midwayjs/core';
import { GoodsInfoEntity } from '../../entity/info';
import { GoodsInfoService } from '../../service/info';

/**
 * goods模块-商品信息
 */
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: GoodsInfoEntity,
  service: GoodsInfoService,
  pageQueryOp: {
    keyWordLikeFields: ['title'],
    fieldEq: ['category'],
  }
})
export class AdminGoodsInfoController extends BaseController {
  @Inject()
  goodsInfoService: GoodsInfoService;
}
