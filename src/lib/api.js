// create multiple functions and export out for data fetching

const apiUrl = import.meta.env.VITE_API_URL;

// function for Good Memories
export async function LoadGoodMemory() {
 const endpoint = `${apiUrl}/api/good-memory/`
 const response = await fetch(endpoint);
 if(!response.ok) {
  throw new Error(`HTTP error`)
 }
 const data = await response.json()
 console.log('Good memories:', data)
 return data
}

// function for bad memories
export async function LoadBadMemory() {
    if(!BadMemoryStore.length) {
        const endpoint = `${apiUrl}/api/bad-memory/`
        const response = await fetch(endpoint)
        const data = await response.json()
        console.log('Bad Memories:', data)
        BadMemoryStore.set(data)
    }
}

// function for images
export async function LoadImages() {
    if(!ImagesStore.length) {
        const endpoint = `${apiUrl}/api/images/`
        const response = await fetch(endpoint)
        const data = await response.json()
        console.log('Images:', data)
        ImagesStore.set(data)
    }
}
