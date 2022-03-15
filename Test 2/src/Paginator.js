import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'

import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function PageAmountSelector(props) {
    const select5PerPage = ()=> props.onPerPageChange(5)
    const select10PerPage = ()=> props.onPerPageChange(10)
    const select20PerPage = ()=> props.onPerPageChange(20)
    const selectAllOnePage = ()=> props.onPerPageChange(1000)
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
          {props.perPage?props.perPage + " Per Page": "Per Selector"} 
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-30 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={select5PerPage}
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  5 Per Page
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                onClick={select10PerPage}
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  10 Per Page
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                onClick={select20PerPage}
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  20 Per Page
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                onClick={selectAllOnePage}
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  All One Page
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default function Paginator(props) {
//   const numFilters = props.colors.reduce((prev,cur,) => cur.checked? prev++:prev,0);  
    const {data,page,perPage} = props.paginate;
    const {previousPage,nextPage,totalPages} = data;
    let pages = [];
    for(let i = 1; i <= totalPages; i++){
        let classess = "bg-white border-gray-300 text-gray-500 hover:bg-gray-50";
        if(i === page)
            classess = "cursor-default z-10 bg-indigo-50 border-indigo-500 text-indigo-600";
        pages.push(<button
            key={i}
            onClick={()=>props.onPageTurn(i)}
            aria-current="page"
            className={classess+" relative inline-flex items-center px-4 py-2 border text-sm font-medium"}>
            {i}
        </button>);
    }
    return (
        <div>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
           {
               page === 1? null: ( 
                <button onClick={()=>props.onPageTurn(previousPage)} className="cursor-pointer relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    <span className="sr-only">Previous</span>
                    <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                </button>)
           }
           {pages}
            {/* Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */}
            {
                page === totalPages? null: 
                <button onClick={()=>props.onPageTurn(nextPage)} className="cursor-pointer relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    <span className="sr-only">Next</span>
                    <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                </button>
            }
            <PageAmountSelector onPerPageChange={props.onPerPageChange} perPage={perPage}/>

            </nav>
        </div>
    )
}



