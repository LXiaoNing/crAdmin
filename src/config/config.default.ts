import { CoolConfig } from '@cool-midway/core';
import { MidwayConfig } from '@midwayjs/core';
import { CoolCacheStore } from '@cool-midway/core';

// redis缓存
import { redisStore } from 'cache-manager-ioredis-yet';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: 'c3fddb20d0d511efa0fa41bbbd905e6b',
  koa: {
    port: 8001,
  },
  // 模板渲染
  view: {
    mapping: {
      '.html': 'ejs',
    },
  },
  // 静态文件配置
  staticFile: {
    buffer: true,
  },
  // 文件上传
  upload: {
    fileSize: '200mb',
    whitelist: null,
  },
  // 缓存 可切换成其他缓存如：redis http://www.midwayjs.org/docs/extensions/caching
  // cacheManager: {
  //   clients: {
  //     default: {
  //       store: CoolCacheStore,
  //       options: {
  //         path: 'cache',
  //         ttl: 0,
  //       },
  //     },
  //   },
  // },
  cacheManager: {
    clients: {
      default: {
        store: redisStore,
        options: {
          port: 6379,
          host: '8.155.39.171',
          password: '123456',
          ttl: 0,
          db: 0,
        },
      },
    },
  },
  cool: {
    // 已经插件化，本地文件上传查看 plugin/config.ts，其他云存储查看对应插件的使用
    file: {},
    // crud配置
    crud: {
      // 插入模式，save不会校验字段(允许传入不存在的字段)，insert会校验字段
      upsert: 'save',
      // 软删除
      softDelete: true,
    },
  } as CoolConfig,
} as MidwayConfig;
