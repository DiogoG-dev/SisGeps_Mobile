require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

// Configurar Supabase
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
const email = process.env.EMAIL;
const password = process.env.PASSWORD;

describe('Teste de Integração com Supabase - Produtos', () => {
  
  // Teste para cadastrar um produto
  it('Deve cadastrar um novo produto', async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });
  
    expect(error).toBeNull();
    expect(data).toBeDefined();

    const newProduct = {
      product_name: 'Conseguimos',
      category: 'Realizar teste',
      manufacturer: 'Teste de integração',
      amount: 3,
      value_per_unit: 10,
    };

    // Inserir produto no Supabase
    const { data: dataUser, error: insertError } = await supabase
      .from('products')
      .insert([newProduct])
      .select();

    // Verificar se o produto foi inserido corretamente
    expect(insertError).toBeNull();
    expect(dataUser).toBeDefined();
   
    if (dataUser && dataUser.length > 0) {
        expect(dataUser[0].product_name).toBe(newProduct.product_name);

    } else {
        throw new Error('O produto não foi inserido corretamente');
    }
  });

  // Teste para editar um produto
  it('Deve editar um produto existente', async () => {
    const productId = 22; //definir qual produto deve ser editado através do id

    // Verificar se o produto existe
    const { data: existingProduct, error: fetchError } = await supabase
    .from('products')
    .select('*')
    .eq('id', productId)
    .single();

    expect(fetchError).toBeNull();
    expect(existingProduct).toBeDefined();

    const updatedProduct = {
      product_name: 'Conseguimos Editar',
      category: 'Editado com sucesso',
      manufacturer: 'SISGEPs',
      amount: 1,
      value_per_unit: 10,
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
    const productId = 37;

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
