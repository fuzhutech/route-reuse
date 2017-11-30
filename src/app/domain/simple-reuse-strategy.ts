import {
  RouteReuseStrategy,
  DefaultUrlSerializer,
  ActivatedRouteSnapshot,
  DetachedRouteHandle
} from '@angular/router';

export class SimpleReuseStrategy implements RouteReuseStrategy {

  public static handlers: { [key: string]: DetachedRouteHandle } = {};

  private static waitDelete: string;

  // 是否允许复用路由
  /** 表示对所有路由允许复用 如果你有路由不想利用可以在这加一些业务逻辑判断 */
  public shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return true;
  }

  // 当路由离开时会触发，存储路由
  /** 当路由离开时会触发。按path作为key存储路由快照&组件当前实例对象 */
  public store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
    SimpleReuseStrategy.handlers[route.routeConfig.path] = handle;

    /*if (SimpleReuseStrategy.waitDelete && SimpleReuseStrategy.waitDelete === this.getRouteUrl(route)) {
      // 如果待删除是当前路由则不存储快照
      SimpleReuseStrategy.waitDelete = null
      return;
    }
    SimpleReuseStrategy.handlers[this.getRouteUrl(route)] = handle;*/
  }

  // 是否允许还原路由
  /** 若 path 在缓存中有的都认为允许还原路由 */
  public shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return !!route.routeConfig && !!SimpleReuseStrategy.handlers[route.routeConfig.path];
  }

  //  获取存储路由
  /** 从缓存中获取快照，若无则返回nul */
  public retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
    if (!route.routeConfig) {
      return null;
    }

    return SimpleReuseStrategy.handlers[route.routeConfig.path];
  }

  // 进入路由触发，是否同一路由时复用路由
  /** 进入路由触发，判断是否同一路由 */
  public shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    return future.routeConfig === curr.routeConfig;

    // 有些页面虽然是用的同一个路由，但是有可能是参数不一样
    /*return future.routeConfig === curr.routeConfig &&
      JSON.stringify(future.params) === JSON.stringify(curr.params);*/
  }

  private getRouteUrl(route: ActivatedRouteSnapshot) {
    return route['_routerState'].url.replace(/\//g, '_');
  }

  public deleteRouteSnapshot(name: string): void {
    if (SimpleReuseStrategy.handlers[name]) {
      delete SimpleReuseStrategy.handlers[name];
    } else {
      SimpleReuseStrategy.waitDelete = name;
    }
  }
}
