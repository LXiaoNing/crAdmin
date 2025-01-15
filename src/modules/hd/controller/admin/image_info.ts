import { CoolController, BaseController } from '@cool-midway/core';
import { Body, Inject, Post, Get, Query } from '@midwayjs/core';
import { HdImageInfoEntity } from '../../entity/image_info';
import { HdImageInfoService } from '../../service/image_info';

/**
 * hd模块-图片信息
 */
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: HdImageInfoEntity,
  service: HdImageInfoService,
  pageQueryOp: {
    keyWordLikeFields: ['title'],
    fieldEq: ['color'],
  }
})
export class AdminHdImageInfoController extends BaseController {
  @Inject()
  hdImageInfoService: HdImageInfoService;
}
