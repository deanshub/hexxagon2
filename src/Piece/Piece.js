import React from 'react'
import classnames from 'classnames'
import style from './piece.module.css'

export default function({ value, winner }) {
  return (
    <div className={classnames(style.tridiv)}>
      <div className={classnames(style.scene)}>
        <div
          className={classnames(
            style.shape,
            style.cylinder,
            style.cyl,
            { [style.p1]: value === 1 },
            { [style.p2]: value === 2 },
            { [style.winner]: winner === value }
          )}
        >
          <div className={classnames(style.face, style.bm)}>
            <div className={classnames(style.photonShader)} />
          </div>
          <div className={classnames(style.face, style.tp)}>
            <div className={classnames(style.photonShader)} />
          </div>
          <div className={classnames(style.face, style.side, style.s0)}>
            <div className={classnames(style.photonShader)} />
          </div>
          <div className={classnames(style.face, style.side, style.s1)}>
            <div className={classnames(style.photonShader)} />
          </div>
          <div className={classnames(style.face, style.side, style.s2)}>
            <div className={classnames(style.photonShader)} />
          </div>
          <div className={classnames(style.face, style.side, style.s3)}>
            <div className={classnames(style.photonShader)} />
          </div>
          <div className={classnames(style.face, style.side, style.s4)}>
            <div className={classnames(style.photonShader)} />
          </div>
          <div className={classnames(style.face, style.side, style.s5)}>
            <div className={classnames(style.photonShader)} />
          </div>
          <div className={classnames(style.face, style.side, style.s6)}>
            <div className={classnames(style.photonShader)} />
          </div>
          <div className={classnames(style.face, style.side, style.s7)}>
            <div className={classnames(style.photonShader)} />
          </div>
          <div className={classnames(style.face, style.side, style.s8)}>
            <div className={classnames(style.photonShader)} />
          </div>
          <div className={classnames(style.face, style.side, style.s9)}>
            <div className={classnames(style.photonShader)} />
          </div>
          <div className={classnames(style.face, style.side, style.s10)}>
            <div className={classnames(style.photonShader)} />
          </div>
          <div className={classnames(style.face, style.side, style.s11)}>
            <div className={classnames(style.photonShader)} />
          </div>
          <div className={classnames(style.face, style.side, style.s12)}>
            <div className={classnames(style.photonShader)} />
          </div>
          <div className={classnames(style.face, style.side, style.s13)}>
            <div className={classnames(style.photonShader)} />
          </div>
          <div className={classnames(style.face, style.side, style.s14)}>
            <div className={classnames(style.photonShader)} />
          </div>
          <div className={classnames(style.face, style.side, style.s15)}>
            <div className={classnames(style.photonShader)} />
          </div>
          <div className={classnames(style.face, style.side, style.s16)}>
            <div className={classnames(style.photonShader)} />
          </div>
          <div className={classnames(style.face, style.side, style.s17)}>
            <div className={classnames(style.photonShader)} />
          </div>
          <div className={classnames(style.face, style.side, style.s18)}>
            <div className={classnames(style.photonShader)} />
          </div>
          <div className={classnames(style.face, style.side, style.s19)}>
            <div className={classnames(style.photonShader)} />
          </div>
        </div>
      </div>
    </div>
  )
}
