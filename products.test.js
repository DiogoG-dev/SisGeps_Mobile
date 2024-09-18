require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

// Configurar Supabase
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

describe('Teste de Integração com Supabase - Produtos', () => {
  
  // Teste para cadastrar um produto
  it('Deve cadastrar um novo produto', async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: 'sisgeps.suport@sisgeps.com',
        password: '@7SdW9M4JXzHg4d',
    });
  
    expect(error).toBeNull();
    expect(data).toBeDefined();

    const newProduct = {
      product_name: 'Produto de Teste',
      category: 'Categoria Teste',
      manufacturer: 'Fabricante Teste',
      amount: 100,
      value_per_unit: 10.50,
    };

    // Inserir produto no Supabase
    const { data: dataUser, error: insertError } = await supabase
      .from('products')
      .insert([newProduct])
      .select();
    //console.log("dados inseridos: ",dataUser);
    // Verificar se o produto foi inserido corretamente
    expect(insertError).toBeNull();
    expect(dataUser).toBeDefined();
   
    if (dataUser && dataUser.length > 0) {
        expect(dataUser[0].product_name).toBe(newProduct.product_name);
        //console.log("dados inseridos: ",dataUser);
    } else {
        throw new Error('O produto não foi inserido corretamente');
    }
  });

  // Teste para editar um produto
  it('Deve editar um produto existente', async () => {
    const productId = 19; //definir qual produto deve ser editado através do id

    // Verificar se o produto existe
    const { data: existingProduct, error: fetchError } = await supabase
    .from('products')
    .select('*')
    .eq('id', productId)
    .single();

    expect(fetchError).toBeNull();
    expect(existingProduct).toBeDefined();

    const updatedProduct = {
      product_name: 'Produto Editado',
      category: 'Categoria Editada',
      manufacturer: 'Fabricante Editado',
      amount: 200,
      value_per_unit: 15.00,
    };

    // Editar o produto
    const { data, error } = await supabase
      .from('products')
      .update(updatedProduct)
      .eq('id', productId)
      .select();

    //console.log("produto editado: ",data)
    // Verificar se o produto foi editado corretamente
    expect(error).toBeNull();
    expect(data).toBeDefined();
    if (data && data.length > 0) {
        expect(data[0].product_name).toBe(updatedProduct.product_name);
    } else {
        throw new Error('O produto não foi atualizado corretamente');
    }
  });

  // Teste para deletar um produto
  it('Deve deletar um produto existente', async () => {
    const productId = 21;

    // Deletar o produto com id
    const { data, error } = await supabase
      .from('products')
      .delete()
      .eq('id', productId)
      .select();

    // Verificar se o produto foi deletado corretamente
    expect(error).toBeNull();
    expect(data).toBeDefined();
  });
});
