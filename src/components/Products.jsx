import { Fragment, useState } from 'react';
import { useProduct, useProducts } from '../api/api';

const Products = () => {
  const [selectedProductID, setSelectedProductID] = useState(null);

  const productsQuery = useProducts();
  const productQuery = useProduct(selectedProductID);
  // #410e0bff
  // 410e0bff
  return (
    <>
      {productsQuery.data?.pages?.map((group, index) => (
        <Fragment key={index}>
          {group.map((product) => (
            <Fragment key={product.id}>
              <button
                onClick={() => setSelectedProductID(product.id)}
                style={{ marginBottom: '7px', backgroundColor: '#001d35ff' }}
              >
                {product.name}
              </button>
              <br />
            </Fragment>
          ))}
        </Fragment>
      ))}

      <br />
      <div>
        <button
          onClick={() => productsQuery.fetchNextPage()}
          disabled={
            !productsQuery.hasNextPage || productsQuery.isFetchingNextPage
          }
        >
          {productsQuery.isFetchingNextPage
            ? 'Carregando mais...'
            : productsQuery.hasNextPage
            ? 'Carregar mais'
            : 'Nada pra carregar'}
        </button>
      </div>
      <div>Produto selecionado</div>
      {JSON.stringify(productQuery.data)}
    </>
  );
};

export default Products;
