const Loading=()=>{
    return (
        <div className="flex justify-center items-center h-screen flex-col">
          <span className="block w-32 h-32 rounded-full border-[8px] border-black border-t-black/10 border-r-black/10 animate-spin"></span>
          <span className="text-xl font-medium capitalize">loading...</span>
        </div>
      )  
}

export default Loading