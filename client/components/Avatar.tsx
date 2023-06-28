import { useEffect, useRef, MutableRefObject } from 'react'

class AvatarSprite {
  image: HTMLImageElement
  spriteWidth: number
  spriteHeight: number
  width: number
  height: number
  x: number
  y: number
  minFrame: number
  maxFrame: number
  canvasWidth: number
  canvasHeight: number
  scale: number
  frameX: number
  frameY: number
  frame: number

  constructor(canvasWidth: number, canvasHeight: number) {
    this.canvasWidth = canvasWidth
    this.canvasHeight = canvasHeight
    const imageUrl = 'public/assets/CharacterSprites/characters/char1.png'
    this.image = new Image()
    this.image.src = imageUrl
    this.spriteWidth = 32
    this.spriteHeight = 33
    this.width = this.spriteWidth
    this.height = this.spriteHeight
    this.scale = 3
    this.x = this.canvasWidth / 2 - (this.width * this.scale) / 2
    this.y = this.canvasHeight / 2 - (this.height * this.scale) / 2
    this.minFrame = 0
    this.maxFrame = 32
    this.frame = 0
    this.frameX = 0
    this.frameY = 0
  }

  draw(context: CanvasRenderingContext2D) {
    console.log(
      this.frameX,
      this.frameY,
      this.frameX * this.spriteWidth,
      this.frameY * this.spriteHeight
    )
    context.drawImage(
      this.image,
      this.frameX * this.spriteWidth,
      this.frameY * this.spriteHeight,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width * this.scale,
      this.height * this.scale
    )
  }

  update() {
    this.frame = this.frame < this.maxFrame ? this.frame + 1 : this.minFrame
    this.frameX = this.frame % 8
    this.frameY = Math.floor(this.frame / 8)
  }
}

function setup(
  canvas: HTMLCanvasElement,
  avatarRef: MutableRefObject<AvatarSprite | null>
) {
  if (canvas == null) {
    return
  }

  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
  canvas.width = 500
  canvas.height = 500
  console.log(ctx)

  const bob = new AvatarSprite(canvas.width, canvas.height)
  avatarRef.current = bob
  console.log(bob)

  let lastTime = 0
  let token: number | undefined
  const delay = 100

  function animate(time = 0) {
    if (time - lastTime >= delay) {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      bob.draw(ctx)
      bob.update()
      lastTime = time
    }
    token = requestAnimationFrame(animate)
  }

  animate()

  return () => {
    if (token != null) {
      cancelAnimationFrame(token)
    }
  }
}

export default function Avatar() {
  const canvasRef = useRef(null)
  const avatarRef = useRef<AvatarSprite | null>(null)

  // function handleClick() {
  //   if (avatarRef.current) {
  //     avatarRef.current.jump()
  //   }
  // }

  useEffect(() => {
    return setup(canvasRef.current!, avatarRef)
  }, [])

  return (
    <div className="container">
      <canvas id="canvas1" className="canvas1" ref={canvasRef}></canvas>
      {/* <button onClick={handleClick}>Jump</button> */}
    </div>
  )
}
