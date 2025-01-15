import { BaseEntity } from '@cool-midway/core';
import { Column, Entity, Index } from 'typeorm';

/**
 * goods模块-商品信息
 */
@Entity('goods_info')
export class GoodsInfoEntity extends BaseEntity {
  @Index()
  @Column({ comment: '标题', length: 100 })
  title: string;

  @Column({ comment: '分类 0-普通 1-热门 2-推荐', default: 0, type: 'tinyint' })
  category: number;
  @Column({ comment: '分类id 0-未分类', default: 0, type: 'tinyint' })
  categoryid: number;

  @Column({ comment: '图片', length: 255 })
  image: string;

  @Column({
    comment: '价格',
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  price: number;

  @Column({ comment: '图片列表', type: 'json' })
  imageList: string[];
}
