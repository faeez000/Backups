import React from 'react'

function Stage() {
  return (
  
        <div>
            <div className='font-semibold text-md h-[30px] border-2 border-blue-200  '>
                <div className="flex items-center">
                            
                    <span className='ml-3 text-sky-400'> Not Started </span>
                                                        
                </div>
            </div>
                      
            <div
                className="w-[300px]  h-[540px] lg:max-h-[600px] 2xl:h-[750px]  
                bg-white border-2 border-blue-300 overflow-y-auto z-0"
                id={stage.stageId}
                // ref={this.dragulaDecorator}
            >
            </div>
        </div>
   
  )
}

export default Stage
