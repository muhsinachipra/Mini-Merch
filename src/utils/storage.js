const PRODUCTS_KEY = "mini_merch_products";

const DUMMY_PRODUCTS = [
  {
    id: "938472",
    name: "Vintage Denim Jacket",
    price: 45.0,
    category: "clothing",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAsv3UgBELtyAWtCgvz91jYF28kVaKHJx8MDc8x6Do1ewYTrBZvbvQxs0BExTgPPkbdbuvEOlU-G3RIIbMhmr_c2TZC7lzCoMVY-Ri1yVudc-a-gEIe55OUuR9Z53x5MFmNZcnYvZW0JqGia_nO_agMhgRwwRAYUaQtZ_Co6qm4F6E6xfGyBnYUrQkiL1zpYHD6wRZ9eptPCMQBzkPwrL-qaCceU1ul0WNlE1BfP0zb2ktMjBnMz9NIT1d3lkyXDt4KaHMZ91Oii3nN",
    ownerId: "user@test.com",
  },
  {
    id: "827364",
    name: "Ceramic Mug Set",
    price: 22.5,
    category: "home",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBNbeDEzX6TiyHnn_FQKaAHMfaSAFT-qQ8OeSXwkd7FGqgLAypspX2TlvfwRe3WngHaFiqWk-EDeIz8rxXBQdx3FqHg9tuC0Vkbs-y4ZJL8sqWKUdA9LdQcbYohaTLk9ZDSud6YM0CmJQpCfqeO7fdvm5lRscZLuxEsED2p_z5SIFRGek5yw5tG1uKjw9JFlXvGV70FN7PvmsSkTjI5q_OLH-iFq6x_F0WJ9Hr3vtPlUeCjFyBOxBcr3n8x6APJvb3RjEtzeHeRW9kB",
    ownerId: "other@test.com",
  },
  {
    id: "192837",
    name: "Wireless Headphones Pro",
    price: 89.99,
    category: "electronics",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuANC6T1MbNYjnOGI1wNYAIWs136N2wNaLSfvtE8zZl3Tm1_BR0KtdtVaDrEz5QWVakuHxiX4-PJjQOg_SwfvHua1_YLPbHT4-7CV99JdMpxAIpfqGemJ4ay2RoqP6Ok3Ub1U_NSZROoG9lq-ZKwBbAW8-doalHHyzB3YzKo5E3gOfRYPTtgHdx74UcVMR1sjC7yEjZ0L_z-aQaRirHeUNzoW_kYE64jujqUbGdURHM8DfAYngWoFuNj84_MUxFkCIvbilPZW94HurC7",
    ownerId: "user@test.com",
  },
  {
    id: "475869",
    name: "Classic Leather Watch",
    price: 120.0,
    category: "accessories",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDdnjymt5pACL3jA4iTbDoTtd_aj1HSh3EfW94r40RV9V-5JjnwbwnbtbnfCrkz7fG2792cU9ALUEIjSEC94niQ7FibSC8zMANYJb-8nUhObdiI5QJF6uN41IKLDqRvR83Dx2uzu7lSyBJjZ38cjkoAd_xPFX-QBDOs59pBl8kM0ekHY_0OXjpRPB9k97-Nb5oabUi5K4ctSQUvYr9MerhUxVB5zwuRxNs25pij9aUjnfboDMYD9cE41MuJZzxFEmXnLjhCqTvn-B1L",
    ownerId: "user@test.com",
  },
  {
    id: "234567",
    name: "Home Smart Speaker",
    price: 199.0,
    category: "electronics",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDIYhgeP5-07QMqLbgGg58CzTsZTdKwXvJDa8j3zX4zGVJ9_jvpc1Le-hw5kNQBPQzbma3jlKOV9Tj_mVJ79o4vSfHtT6ITVAb4tZQqVZ_yd4h8BBncTi_Lnux1JHoOIPchff1a3yKKVALzWJs28TgbZxxd1NblrF3gSh3WKDlQXJQS-_DiKQZUbT00N36nHzZSRtw-vZNLjm3Z62n2qzx5gdrTC6MOChn_bW4x6a37Q58c35po01Bgkbw9jAmptLgTvK4qFVRZXQgd",
    ownerId: "other@test.com",
  },
];

export const seedProducts = () => {
  const existing = localStorage.getItem(PRODUCTS_KEY);
  if (!existing) {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(DUMMY_PRODUCTS));
  }
};

export const getProducts = () => {
  const data = localStorage.getItem(PRODUCTS_KEY);
  return data ? JSON.parse(data) : [];
};

export const addProduct = (product) => {
  const products = getProducts();
  const newProduct = {
    ...product,
    id: Math.random().toString(36).substr(2, 9),
  };
  products.unshift(newProduct);
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
  return newProduct;
};

export const deleteProduct = (id) => {
  let products = getProducts();
  products = products.filter((p) => p.id !== id);
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
};
