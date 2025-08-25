import Stack from "./ui/stack"

const AvatarStack = () => {
  const items = [
    {
      id: 1,
      name: 'Hardy',
      avatar:
        'https://media.istockphoto.com/id/536988396/photo/confident-man-in-blue-sweater-portrait.webp?a=1&b=1&s=612x612&w=0&k=20&c=hkHZBfwffufmuI-fUDPde9WcwXKj8IfEYlLdE5odft0=',
    },
    {
      id: 2,
      name: 'Sunita',
      avatar: 'https://images.pexels.com/photos/1162983/pexels-photo-1162983.jpeg',
    },
    {
      id: 3,
      name: 'Kailash',
      avatar:
        'https://images.unsplash.com/photo-1661051830189-54dfcfcf3a0f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bW9kZWwlMjBtYW58ZW58MHx8MHx8fDA%3D',
    },
    {
      id: 4,
      name: 'Kunal',
      avatar:
        'https://plus.unsplash.com/premium_photo-1673734625279-2738ecf66fa1?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bW9kZWwlMjBtYW58ZW58MHx8MHx8fDA%3D',
    },
    {
      id: 5,
      name: 'Keshav',
      avatar:
        'https://images.unsplash.com/photo-1619533394727-57d522857f89?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bW9kZWwlMjBtYW58ZW58MHx8MHx8fDA%3D',
    },
  ]

  return (
    <div className="
      max-w-full mx-auto h-screen flex justify-center items-center
      bg-black
      bg-[linear-gradient(to_right,#1f2937_1px,transparent_2px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)]
      bg-[size:40px_40px]
    ">
      <Stack items={items} />
    </div>
  )
}

export default AvatarStack
