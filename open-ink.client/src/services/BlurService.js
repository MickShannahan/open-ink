import { decode } from "blurhash";
import { logger } from "../utils/Logger.js";

class BlurService {
  hash(canvas, hash, width, height) {
    logger.log('@@ decode started', hash, width, height)
    const pixels = decode(hash, width, height);
    logger.log('## decode stopped', hash)
    const ctx = canvas.getContext("2d");
    const imageData = ctx.createImageData(parseInt(width), parseInt(height))
    ctx.width = width
    ctx.height = height
    imageData.data.set(pixels);
    ctx.putImageData(imageData, 0, 0);
  }
}

export const blurService = new BlurService()
