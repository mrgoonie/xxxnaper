/**
 * Image state store
 */

import type { ImageState } from '$lib/types';

const initialState: ImageState = {
  url: null,
  file: null,
  width: 0,
  height: 0,
};

class ImageStore {
  private state = $state<ImageState>(initialState);

  get current(): ImageState {
    return this.state;
  }

  get hasImage(): boolean {
    return this.state.url !== null;
  }

  setImage(data: Partial<ImageState>): void {
    this.state = { ...this.state, ...data };
  }

  clearImage(): void {
    this.state = initialState;
  }
}

export const imageStore = new ImageStore();
