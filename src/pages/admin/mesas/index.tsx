import Layout from '@/components/admin/Layout'
import TableDetails from '@/components/admin/TableDetails'

const Mesas = () => {
  return (
    <Layout>
      <TableDetails 
        tableInfo={{
          numTable: 4,
          time: "20:20",
          status: "Aguardando pagamento",
          clientName: "Joãozinho"
        }}

        items={[
          {
            name: "Batata",
            price: 4,
            quantity: 2
          },
          {
            name: "Batata",
            price: 4,
            quantity: 2
          },
          {
            name: "Batata",
            price: 4,
            quantity: 2
          },
        ]}

      />
    </Layout>
  )
}

export default Mesas
