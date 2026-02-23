'use client'

import { useState, useCallback } from 'react'

interface GeolocationState {
  latitude: number | null
  longitude: number | null
  loading: boolean
  error: string | null
}

interface UseGeolocationReturn extends GeolocationState {
  requestLocation: () => void
}

const ERROR_MESSAGES: Record<number, string> = {
  1: 'Доступ к геолокации запрещён. Разрешите в настройках браузера.',
  2: 'Геолокация недоступна на этом устройстве.',
  3: 'Не удалось определить местоположение. Попробуйте ещё раз.',
}

export function useGeolocation(): UseGeolocationReturn {
  const [state, setState] = useState<GeolocationState>({
    latitude: null,
    longitude: null,
    loading: false,
    error: null,
  })

  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setState((prev) => ({
        ...prev,
        error: 'Геолокация не поддерживается вашим браузером.',
        loading: false,
      }))
      return
    }

    setState((prev) => ({ ...prev, loading: true, error: null }))

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          loading: false,
          error: null,
        })
      },
      (error) => {
        setState((prev) => ({
          ...prev,
          loading: false,
          error: ERROR_MESSAGES[error.code] ?? 'Неизвестная ошибка геолокации.',
        }))
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 300000,
      }
    )
  }, [])

  return { ...state, requestLocation }
}
