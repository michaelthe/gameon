import {OnDestroy, OnInit} from '@angular/core'

export abstract class LoadingComponent implements OnInit, OnDestroy {
  private _destroy = false;
  private _timeToLoad = 0;

  public ngOnInit() {
    this._loader()
  }

  public ngOnDestroy() {
    this._destroy = true
  }

  protected abstract load()

  private _loader() {
    if (this._destroy) {
      return
    }

    if (Date.now() < this._timeToLoad) {
      return setTimeout(() => {
        requestAnimationFrame(() => this._loader())
      }, 1000)
    }

    this._timeToLoad = Date.now() + 1 * 60 * 1000;
    this._loader();
    this.load();
  }
}
