import { defineStore } from 'pinia'
import { ref } from 'vue'

interface MapPosition {
  lat: number
  lng: number
  altitude: number
}

export const useMapPickerStore = defineStore('mapPicker', () => {
  const selectedPosition = ref<MapPosition | null>(null)
  const isSelecting = ref(false)

  function setSelectedPosition(position: MapPosition) {
    selectedPosition.value = position
  }

  function startSelecting() {
    isSelecting.value = true
  }

  function stopSelecting() {
    isSelecting.value = false
    selectedPosition.value = null
  }

  return {
    selectedPosition,
    isSelecting,
    setSelectedPosition,
    startSelecting,
    stopSelecting
  }
})