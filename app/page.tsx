import TodoList from '../components/TodoList';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
     <section className='w-full flex-center flex-col'>
      <h1 className='head_text text-center'>
        Plan Your Day beforehand
        <br className='max-md:hidden'></br>
        <span className='orange_gradient text-center'>Garisea</span>
      </h1>
      <p className='desc text-center'>
        Get  more productive, creative, 
        organized and effective by planning your time well.The Journey starts today.
        </p>
        
        {/* Render toDo feed Here */}
        <TodoList/>

     
     </section>
    </main>
  )
}
