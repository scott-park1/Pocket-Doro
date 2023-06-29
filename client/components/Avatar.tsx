

import React from 'react'
import { SpriteAnimator } from 'react-sprite-animator'


const walk = 'assets/CharacterSprites/characters/char1.png'
const clothes = 'assets/CharacterSprites/separate/walk/clothes/dress_walk.png'
const hair = 'assets/CharacterSprites/separate/walk/hair/spacebuns_walk.png'
const earrings =
  'assets/CharacterSprites/separate/walk/acc/earring_red_silver_walk.png'
const shoes = 'assets/CharacterSprites/separate/walk/clothes/shoes_walk.png'

export default function Avatar() {
  const spriteWidth = 32
  const spriteHeight = 32
  const scale = 1 / 5
  const frameCount = 8 // rows
  const wrapAfter = 8 // columns
  const fps = 10 // speed

  return (
    <div className="avatar" style={{ imageRendering: 'pixelated' }}>
      <SpriteAnimator
        sprite={walk}
        width={spriteWidth}
        height={spriteHeight}
        scale={scale}
        frameCount={frameCount}
        wrapAfter={wrapAfter}
        fps={fps}
        shouldAnimate={true}
        direction="horizontal"
      />
      <SpriteAnimator
        sprite={clothes}
        width={spriteWidth}
        height={spriteHeight}
        scale={scale}
        frameCount={frameCount}
        wrapAfter={wrapAfter}
        fps={fps}
        shouldAnimate={true}
        direction="horizontal"
        className="clothes"
      />
      <SpriteAnimator
        sprite={hair}
        width={spriteWidth}
        height={spriteHeight}
        scale={scale}
        frameCount={frameCount}
        wrapAfter={wrapAfter}
        fps={fps}
        shouldAnimate={true}
        direction="horizontal"
        className="clothes"
      />
      <SpriteAnimator
        sprite={earrings}
        width={spriteWidth}
        height={spriteHeight}
        scale={scale}
        frameCount={frameCount}
        wrapAfter={wrapAfter}
        fps={fps}
        shouldAnimate={true}
        direction="horizontal"
        className="clothes"
      />
      <SpriteAnimator
        sprite={shoes}
        width={spriteWidth}
        height={spriteHeight}
        scale={scale}
        frameCount={frameCount}
        wrapAfter={wrapAfter}
        fps={fps}
        shouldAnimate={true}
        direction="horizontal"
        className="clothes"
      />
    </div>
  )
}
