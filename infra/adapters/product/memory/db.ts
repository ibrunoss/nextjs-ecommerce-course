export interface ProductMemory {
  id: string;
  nome: string;
  descricao: string;
  imagem: string;
  preco: number;
  estoque: number;
  marca: string;
}

export const productsInMemory: ProductMemory[] = [
  {
    id: "1",
    nome: "Camiseta Básica",
    descricao: "Camiseta 100% algodão, confortável e estilosa.",
    imagem: "https://picsum.photos/id/237/400/400",
    preco: 49.9,
    estoque: 10,
    marca: "Urban Wear",
  },
  {
    id: "2",
    nome: "Tênis Esportivo",
    descricao: "Ideal para corridas e caminhadas. Leve e durável.",
    imagem: "https://picsum.photos/id/1025/400/400",
    preco: 199.9,
    estoque: 5,
    marca: "FastStep",
  },
  {
    id: "3",
    nome: "Mochila Casual",
    descricao: "Perfeita para o dia a dia, com compartimento para notebook.",
    imagem: "https://picsum.photos/id/103/400/400",
    preco: 129.9,
    estoque: 8,
    marca: "DailyPack",
  },
  {
    id: "4",
    nome: "Relógio Digital",
    descricao: "Moderno, resistente à água e com múltiplas funções.",
    imagem: "https://picsum.photos/id/1044/400/400",
    preco: 89.9,
    estoque: 12,
    marca: "TimeX",
  },
  {
    id: "5",
    nome: "Fone de Ouvido Bluetooth",
    descricao: "Com cancelamento de ruído e bateria de longa duração.",
    imagem: "https://picsum.photos/id/1050/400/400",
    preco: 159.9,
    estoque: 7,
    marca: "SoundBeat",
  },
  {
    id: "6",
    nome: "Jaqueta Corta Vento",
    descricao: "Ideal para dias frios e chuvosos. Estilo e proteção.",
    imagem: "https://picsum.photos/id/1062/400/400",
    preco: 219.9,
    estoque: 4,
    marca: "OutdoorPro",
  },
  {
    id: "7",
    nome: "Smartwatch",
    descricao: "Monitore sua saúde com estilo.",
    imagem: "https://picsum.photos/id/1080/400/400",
    preco: 299.9,
    estoque: 6,
    marca: "LifeTrack",
  },
  {
    id: "8",
    nome: "Bolsa Feminina",
    descricao: "Design moderno, com espaço interno inteligente.",
    imagem: "https://picsum.photos/id/1084/400/400",
    preco: 139.9,
    estoque: 10,
    marca: "Elegance",
  },
  {
    id: "9",
    nome: "Óculos de Sol",
    descricao: "Proteção UV e armação leve e resistente.",
    imagem: "https://picsum.photos/id/1069/400/400",
    preco: 89.9,
    estoque: 15,
    marca: "SunMax",
  },
  {
    id: "10",
    nome: "Mouse Gamer RGB",
    descricao: "Alta precisão e iluminação personalizável.",
    imagem: "https://picsum.photos/id/1070/400/400",
    preco: 149.9,
    estoque: 20,
    marca: "ProClick",
  },
  {
    id: "11",
    nome: "Livro de Ficção",
    descricao: "Uma história envolvente do início ao fim.",
    imagem: "https://picsum.photos/id/1021/400/400",
    preco: 39.9,
    estoque: 30,
    marca: "Editora Alfa",
  },
  {
    id: "12",
    nome: "Cadeira de Escritório",
    descricao: "Ergonômica e ajustável, ideal para home office.",
    imagem: "https://picsum.photos/id/1049/400/400",
    preco: 499.9,
    estoque: 3,
    marca: "WorkStyle",
  },
];
