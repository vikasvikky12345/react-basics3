import React, { useState } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Header from './Components/Header';
import Title from './Components/Title';
import ProductList from './Components/ProductList';
import Footer from './Components/Footer';
import Cart from './Components/Cart';
import { CartProvider } from './Store1/CartContext';
import About from './Components/About';
import Home from './Components/Home';
import ContactUs from './Components/ContactUs';
import ProductPage from './Components/ProductPage';

const App = () => {
  const [showCart, setShowCart] = useState(false);
  const toggleCart = () => {
    setShowCart(!showCart);
  };

  const products = [
    {
      title: 'Pink beard sweatshirt',
      price: 100,
      imageUrl: 'https://images.meesho.com/images/products/57980365/vcs7j_512.webp',
      images: [
        'https://i5.walmartimages.com/asr/20480ecb-15f3-42bc-bd37-4d28e504cde3.fce0bc85c758cff654153fee49a8f852.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7i6cdemiwvpnnrjrFaSqC_cGIt8_FAaABqPRe20Acnm2CGmLqUywZBnlB4LR5z2amfmw&usqp=CAU',
        'https://m.media-amazon.com/images/I/51Mu+K-khwS._AC_UY1100_.jpg',
      ],
      reviews: ['Great product!', 'Highly recommended'],
    },
    {
      title: 'Womens OverSized Hoddies',
      price: 100,
      imageUrl: 'https://assets.myntassets.com/dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/20398396/2022/12/6/82bb7954-dfba-43ab-9124-8b8c3735bfc01670309647115-DILLINGER-Women-Sweatshirts-6311670309646159-1.jpg',
      images: [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2ZRVdpzbwG6jM_z4mN0eRHFB_7rCumy3yugCOoYJV0Fu1qpQ4PmAkFkIIK3gjYF04_YA&usqp=CAU',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYykr2mRu33-jxlXTyvH4V1rzPYwILEKy2iSPZKbTjndgwNo8nNe_6D3XmTHk9Huz7AzQ&usqp=CAU',
        'https://di2ponv0v5otw.cloudfront.net/posts/2022/04/05/624c914ff5c24469399a94bd/m_624c9150f5c24469399a9524.jpeg',
      ],
      reviews: ['Great product!', 'Highly recommended'],
    },
    {
      title: 'Mens Simple Jumper',
      price: 100,
      imageUrl: 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/67a658a6-cea3-4996-a407-69bfd964fd12/dri-fit-standard-issue-pullover-basketball-hoodie-grJbPW.png',
      images: [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEAlpvKW_icpl4NqJGRp5KzslNABzRlq7iZzhRxmTVopCBTfGXCHgU3ec2ESZrDUz2K-o&usqp=CAU',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqXqoOHt2QciVlg9hkQzcFLazLkzqcfRTmkinkCG3G6S_hVWKDqqdWv3FvYcUcI2LjuYM&usqp=CAU',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUZwxBabh8N8zteX-gE33p2FJIpY0LIc1b12Kpm2Y7XYr4Dr01wJyxsxoX5eDviPxZICM&usqp=CAU',
      ],
      reviews: ['Great product!', 'Highly recommended'],
    },
    {
      title: 'Green Simple Hoodie',
      price: 100,
      imageUrl: 'https://amendi.centracdn.net/client/dynamic/images/261_2019bb593b-solomon-black.jpg',
      images: [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKdrO1jbyPV9aTSeIAapjKV16xHd4MtskEPFeVktFadlXi_KpPJEM8ucniI1xsFdIQZk4&usqp=CAU',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQnuqUS0knYWa-TRlbHt2UPc01_p5ucLfC6vL953870Rz-lJ6pI1DQZbm5n1HVIaq_6r0&usqp=CAU',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStooRvMBtxpipuOCpf17vzyGRf9yPaIu5ibFEuiN89iAhGQXPMmOa0F36A4Dyy8hf8ei8&usqp=CAU',
      ],
      reviews: ['Great product!', 'Highly recommended'],
    }
  ];

  return (
    <BrowserRouter>
      <div>
        <CartProvider>
          <Header toggleCart={toggleCart} />
          <Title />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/store" element={<ProductList products={products} />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/product/:id" element={<ProductPage />} />
          </Routes>
          {showCart && <Cart toggleCart={toggleCart} />}
        </CartProvider>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
