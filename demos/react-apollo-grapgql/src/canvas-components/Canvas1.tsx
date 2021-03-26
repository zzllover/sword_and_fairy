import React, { useCallback, useEffect, useRef } from 'react';

// 1. basic element
export const Canvas1 = (props: any) => <canvas {...props} />

// 2. 获取canvas节点, 用react的方法，ref而不是 getElement
export const Canvas2 = (props: any) => {
  const canvasRef = useRef(null)

  return <canvas ref={canvasRef} {...props} />
}

// 3. 使用 canvasRef操作 画布

export const Canvas3 = (props: any) => {
  const canvasRef = useRef(null)
  const canvas = canvasRef.current
  // 报错
  // const context = canvas.getContext('2d')

  return <canvas ref={canvasRef} {...props}/>
}

// 4. 正确的时机获取Canvas节点，当然是在渲染完成后（此时才能ref到这个画布节点）
export const Canvas4 = (props: any) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (canvasRef && canvasRef.current) {
      const canvas = canvasRef.current
      const context = canvas.getContext('2d') as CanvasRenderingContext2D
      context.fillStyle = '#000000'
      context.fillRect(0,0, context.canvas.width, context.canvas.height)
    }
  },[])

  return <canvas ref={canvasRef} {...props} />
}

// 5. 抽离绘制函数



export const Canvas5 = (props: any) => {

  const canvasRef = useRef<HTMLCanvasElement>(null)

  // 如果一个函数会被加入到 useeffect的第二个参数，那么函数怎么变化呢，
  // 这里使用useCallback显式注入变化，这里相当于不变的
  const draw = useCallback((ctx: CanvasRenderingContext2D) => {
      ctx.fillStyle = '#000000'
      ctx.beginPath()
      ctx.arc(50, 100, 20, 0, 2 * Math.PI)
      ctx.fill()
    }, [])

  useEffect(() => {
    if (canvasRef && canvasRef.current) {
      const canvas = canvasRef.current
      const context = canvas.getContext('2d') as CanvasRenderingContext2D
      draw(context)
    }
  }, [draw])

  return <canvas ref={canvasRef} {...props} />
}

// 6. 使用canvas绘制动画
export const Canvas6 = (props: any) => {

  const canvasRef = useRef<HTMLCanvasElement>(null)

  const draw = useCallback((ctx: CanvasRenderingContext2D, frameCount: number) => {
    // console.log(frameCount)
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    ctx.fillStyle = '#000000'
    ctx.beginPath()
    ctx.arc(50, 100, 20 * Math.sin(frameCount * 0.05) ** 2, 0, 2 * Math.PI)
    ctx.fill()
  }, [])

  useEffect(() => {
    if (canvasRef && canvasRef.current) {
      const canvas = canvasRef.current
      const context = canvas.getContext('2d') as CanvasRenderingContext2D

      let frameCount = 0
      let animationFrameId: number

      const render = () => {
        frameCount++
        draw(context, frameCount)
        animationFrameId = window.requestAnimationFrame(render)
      }

      render()

      return () => {
        window.cancelAnimationFrame(animationFrameId)
      }

    }
  }, [draw])

  return <canvas ref={canvasRef} {...props} />
}

export const Canvas7 = (props: any) => {
  const { draw, ...rest } = props
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (canvasRef && canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d') as CanvasRenderingContext2D;

      let frameCount = 0;
      let animationFrameId: number;

      const render = () => {
        frameCount++
        draw(context, frameCount)
        animationFrameId = window.requestAnimationFrame(render)
      }
      render()
      return () => {
        window.cancelAnimationFrame(animationFrameId)
      }

    }
  }, [draw])

  return <canvas ref={canvasRef} {...rest} />
}

// ================>canvas hooks

export const useCanvas = (draw: any) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (canvasRef && canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d') as CanvasRenderingContext2D
      let frameCount = 0;
      let animationFrameId: number;
      const render = () => {
        frameCount++
        draw(context, frameCount)
        animationFrameId = window.requestAnimationFrame(render)
      }
      render()
      return () => {
        window.cancelAnimationFrame(animationFrameId)
      }
    }
   }, [draw])
  return canvasRef
}

export const Canvas8 = (props: any) => {
  const { draw, ...rest } = props
  const canvasRef = useCanvas(draw)

  return <canvas ref={canvasRef} {...rest} />
}
// <=================================

// ======> 9. 拓展额外属性？

// 增加 useCanvas的参数 option

// 在canvas组件内透穿


// <=====

// 10. 调整大小

// deviceRatio

export function demo(canvas: HTMLCanvasElement) {
  var ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

  // Set display size (css pixels).
  var size = 200;
  canvas.style.width = size + "px";
  canvas.style.height = size + "px";

  // Set actual size in memory (scaled to account for extra pixel density).
  var scale = window.devicePixelRatio; // Change to 1 on retina screens to see blurry canvas.
  canvas.width = Math.floor(size * scale);
  canvas.height = Math.floor(size * scale);

  // Normalize coordinate system to use css pixels.
  ctx.scale(scale, scale);
}