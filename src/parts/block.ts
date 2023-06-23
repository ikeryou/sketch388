import { MyDisplay } from "../core/myDisplay";
import { Func } from "../core/func";
import { Tween } from "../core/tween";
import { SvhGetter } from "../core/svhGetter";
import { Conf } from "../core/conf";
import { Color } from "three";
import { Util } from "../libs/util";

// -----------------------------------------
//
// -----------------------------------------
export class Block extends MyDisplay {

  private _id: number
  private _inner: HTMLElement
  private _img: HTMLElement
  private _photo: HTMLElement

  constructor(opt:any) {
    super(opt)

    this._id = opt.id

    const inner = document.createElement('div')
    inner.classList.add('l-block-inner')
    this.el.appendChild(inner)
    this._inner = inner

    const photo = document.createElement('div')
    photo.classList.add('l-block-photo')
    inner.appendChild(photo)
    this._photo = photo

    const img = document.createElement('img')
    img.setAttribute('src', '/assets/img/sample-1.jpg')
    photo.appendChild(img)
    this._img = img


    // const col = new Color(Util.random(0,1), Util.random(0,1), Util.random(0,1))
    const g = Util.random(0,1)
    const col = new Color(g, g, g)
    // const colR = new Color(1 - col.r, 1 - col.g, 1 - col.b)
    Tween.set(this._inner, {
      // border: '2px solid ' + col.getStyle(),
      backgroundColor: col.getStyle()
    })
  }


  protected _update(): void {
    super._update();

    const sw = Func.sw()
    const sh = SvhGetter.instance.val

    const imgWidth = 1536
    const imgHeight = 2048

    let w = sw
    let h = imgHeight * (w / imgWidth)
    if(h > sh) {
      h = sh
      w = imgWidth * (h / imgHeight)
    }

    const blockHeight = h / Conf.NUM_IMG

    Tween.set(this.el, {
      marginTop: sh * 0.1 * (this._id + 1),
      height: h * 0.025 * Conf.NUM_IMG
    })

    Tween.set(this._inner, {
      top: this._id * blockHeight
    })

    Tween.set(this._photo, {
      height: blockHeight
    })

    Tween.set(this._img, {
      width: w,
      top: this._id * -blockHeight,
      left: sw * 0.5 - w * 0.5,
    })
  }

  protected _resize(): void {
    super._resize();
  }
}