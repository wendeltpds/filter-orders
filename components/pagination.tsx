"use client"
import {
  Pagination as PaginationComponent,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';


type PaginationProps = {
  lastPage: number
  links: {
    url: string,
    label: string,
    active: boolean,
    id: number
  }[];
}


export default function Pagination({links , lastPage}: PaginationProps) {
  
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()
  
  function handleClickPage(pageNumber: number) {
    const params = new URLSearchParams(searchParams)
    
    if(pageNumber >= 1) {
      if(pageNumber > lastPage){
        params.set('page',lastPage.toString())
      }else {
        params.set("page", pageNumber.toString())
      }
    } else {
    params.delete('page')
    }

    replace(`${pathname}?${params.toString()}`, {scroll: false})
  }

  return (
    <PaginationComponent>
      <PaginationContent>

        <PaginationItem onClick={() => handleClickPage(Number(searchParams.get('page') || 1) - 1)}>
          <PaginationPrevious className=' cursor-pointer' />
        </PaginationItem>

        
        {links.map((link) => {
          if (link.label.includes('Próximo') || link.label.includes('Anterior')) {
            return null;
          }

          if(link.label === '...'){
            return (
              <PaginationItem key={link.id} className=' hidden md:inline-flex'>
                <PaginationEllipsis />
              </PaginationItem>
            )
          }

          return (
            <PaginationItem key={link.id} className=' cursor-pointer'>
                <PaginationLink isActive={link.active}
                onClick={() => handleClickPage(Number(link.label))}
                dangerouslySetInnerHTML={{ __html: link.label}}
                >
                </PaginationLink>
            </PaginationItem>
          )
        })}

        <PaginationItem onClick={() => handleClickPage(Number(searchParams.get('page')) + 1)}>
          <PaginationNext className=' cursor-pointer' />
        </PaginationItem>


      </PaginationContent>
    </PaginationComponent>
  );
}
