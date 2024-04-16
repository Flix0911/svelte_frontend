// create multiple functions and export out for data fetching

const apiUrl = import.meta.env.VITE_API_URL;

// function for Good Memories
export async function LoadGoodMemory() {
 const endpoint = `${apiUrl}good-memory/`
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
  const endpoint = `${apiUrl}bad-memory/`
  const response = await fetch(endpoint);
  if(!response.ok) {
    throw new Error('HTTP error')
  }
  const data = await response.json()
  console.log('Bad Memories:', data)
  return data
}

// function for images
export async function LoadImages() {
  const endpoint = `${apiUrl}images/`
  console.log(endpoint)
  const response = await fetch(endpoint)
  if(!response.ok) {
    throw new Error('HTTP error')
  }
  const data = await response.json()
  console.log('Images:', data)
  return data
}
