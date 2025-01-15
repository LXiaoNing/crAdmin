import { BaseEntity } from '@cool-midway/core';
import { Column, Entity, Index } from 'typeorm';

/**
 * hd模块-图片信息
 */
@Entity('hd_image_info')
export class HdImageInfoEntity extends BaseEntity {
  @Column({ comment: '图片', nullable: true })
  image: string;

  @Index()
  @Column({ comment: '标题' })
  title: string;

  @Column({ comment: '链接' })
  link: string;

  @Column({ comment: '排序', default: 0 })
  sort: number;

  @Column({ comment: '颜色' })
  color: string;
}
