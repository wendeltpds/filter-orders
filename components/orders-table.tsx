"use client"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from './ui/badge';
import { ChevronsDown, ChevronsUp, ChevronsUpDown, Currency, Divide } from 'lucide-react';
import { Order } from '@/lib/types';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const format = new Intl.NumberFormat('pt-br', {
  style: 'currency',
  currency: 'BRL'
})

export default function OrdersTable({orders}: {orders: Order[]}) {

  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()
  const params = new URLSearchParams(searchParams)


  function handleClick(key: string) {

    if(params.get('sort') === key){
      params.set('sort' , `-${key}`)
    }else if(params.get('sort') === `-${key}`){
      params.delete('sort')
    }else if (key){
      params.set('sort',key)
    }

    replace(`${pathname}?${params.toString()}`)
  }

  function getSortIcon(key: string){
    if(searchParams.get('sort') === key) {
      return <ChevronsDown className="w-4" />
    } else if(searchParams.get('sort') === `-${key}`) {
      return <ChevronsUp className="w-4" />
    } 

    return <ChevronsUpDown className="w-4" />
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="w-full">
          <TableHead className="table-cell">Cliente</TableHead>
          <TableHead className="table-cell">Status</TableHead>
          <TableHead className=" hidden md:table-cell cursor-pointer 
          justify-end items-center gap-1" onClick={() => handleClick('order_date')}>

          <div className="flex items-center gap-1">
              data
              {getSortIcon('order_date')}
          </div>

          </TableHead>
          <TableHead className="text-right cursor-pointer flex 
          justify-end items-center gap-1" onClick={() => handleClick('amount_in_cents')}>
            Valor
            {getSortIcon('amount_in_cents')}
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
      {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell>
              <div className="font-medium">{order.customer_name}</div>
              <div className="hidden md:inline text-sm text-muted-foreground">
                {order.customer_email}
              </div>
            </TableCell>
            <TableCell>
              <Badge className={`text-xs`} variant="outline">
                {order.status === 'pending' ? "pendente" : "completo"}
              </Badge>
            </TableCell>
            <TableCell className="hidden md:table-cell">{order.order_date.toString()}</TableCell>
            <TableCell className="text-right">{format.format(order.amount_in_cents/100)}</TableCell>
          </TableRow>
        ))}
    
      </TableBody>
    </Table>
  );
}
