import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import axios from "axios";
import { 
  BarChart3, 
  Package, 
  Users, 
  ShoppingCart, 
  MessageSquare, 
  Share2, 
  Home,
  AlertTriangle,
  DollarSign,
  TrendingUp,
  Bell,
  Search,
  Plus,
  Eye,
  Edit,
  Trash,
  Phone,
  QrCode,
  Send
} from "lucide-react";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Badge } from "./components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/ui/select";
import { Label } from "./components/ui/label";
import { Textarea } from "./components/ui/textarea";
import { toast, Toaster } from "sonner";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Navigation Component
const Navigation = () => {
  const location = useLocation();
  
  const navItems = [
    { path: "/", icon: Home, label: "Dashboard" },
    { path: "/products", icon: Package, label: "Inventario" },
    { path: "/orders", icon: ShoppingCart, label: "Pedidos" },
    { path: "/customers", icon: Users, label: "Clientes" },
    { path: "/whatsapp", icon: MessageSquare, label: "WhatsApp" },
    { path: "/marketing", icon: Share2, label: "Marketing" },
  ];

  return (
    <nav className="bg-gradient-to-b from-red-900 to-black w-64 h-screen fixed left-0 top-0 text-white shadow-2xl z-50">
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center">
            <BarChart3 className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Tambar Express</h1>
            <p className="text-red-200 text-sm">Sistema de Gestión</p>
          </div>
        </div>
        
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 hover:bg-red-800/50 ${
                  location.pathname === item.path 
                    ? "bg-red-600 shadow-lg" 
                    : "hover:translate-x-1"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

// Dashboard Component
const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${API}/dashboard/stats`);
      setStats(response.data);
    } catch (error) {
      toast.error("Error al cargar estadísticas");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  const statCards = [
    { title: "Productos Totales", value: stats?.total_products || 0, icon: Package, color: "text-blue-600" },
    { title: "Alertas Stock Bajo", value: stats?.low_stock_alerts || 0, icon: AlertTriangle, color: "text-orange-600" },
    { title: "Pedidos Totales", value: stats?.total_orders || 0, icon: ShoppingCart, color: "text-green-600" },
    { title: "Pedidos Pendientes", value: stats?.pending_orders || 0, icon: Bell, color: "text-red-600" },
    { title: "Ventas Hoy", value: `Bs. ${stats?.today_sales?.toFixed(2) || 0}`, icon: DollarSign, color: "text-emerald-600" },
    { title: "Ventas Mensuales", value: `Bs. ${stats?.monthly_sales?.toFixed(2) || 0}`, icon: TrendingUp, color: "text-purple-600" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <Button onClick={fetchStats} variant="outline">
          Actualizar
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-red-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Resumen del Sistema</CardTitle>
            <CardDescription>Estado actual de Tambar Express</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Total de Clientes</span>
              <span className="font-semibold">{stats?.total_customers || 0}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Mensajes WhatsApp</span>
              <span className="font-semibold">{stats?.whatsapp_messages || 0}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Sistema</span>
              <Badge variant="success" className="bg-green-100 text-green-800">Activo</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Acciones Rápidas</CardTitle>
            <CardDescription>Gestione su negocio rápidamente</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start" variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Nuevo Producto
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Nuevo Pedido
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <MessageSquare className="w-4 h-4 mr-2" />
              Enviar WhatsApp
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Share2 className="w-4 h-4 mr-2" />
              Crear Anuncio
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Products Component
const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    cost_price: "",
    sale_price: "",
    stock: "",
    min_stock: "10",
    supplier: "",
    category: "otros"
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API}/products`);
      setProducts(response.data);
    } catch (error) {
      toast.error("Error al cargar productos");
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async () => {
    try {
      await axios.post(`${API}/products`, {
        ...newProduct,
        cost_price: parseFloat(newProduct.cost_price),
        sale_price: parseFloat(newProduct.sale_price),
        stock: parseInt(newProduct.stock),
        min_stock: parseInt(newProduct.min_stock)
      });
      toast.success("Producto agregado exitosamente");
      setShowAddDialog(false);
      fetchProducts();
      setNewProduct({
        name: "",
        description: "",
        cost_price: "",
        sale_price: "",
        stock: "",
        min_stock: "10",
        supplier: "",
        category: "otros"
      });
    } catch (error) {
      toast.error("Error al agregar producto");
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Gestión de Inventario</h1>
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button className="bg-red-600 hover:bg-red-700">
              <Plus className="w-4 h-4 mr-2" />
              Nuevo Producto
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Agregar Nuevo Producto</DialogTitle>
              <DialogDescription>
                Complete la información del producto
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre del Producto</Label>
                <Input
                  id="name"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                  placeholder="Ej: Cerveza Pilsener"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Categoría</Label>
                <Select 
                  value={newProduct.category} 
                  onValueChange={(value) => setNewProduct({...newProduct, category: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cervezas">Cervezas</SelectItem>
                    <SelectItem value="vinos">Vinos</SelectItem>
                    <SelectItem value="licores">Licores</SelectItem>
                    <SelectItem value="whiskey">Whiskey</SelectItem>
                    <SelectItem value="vodka">Vodka</SelectItem>
                    <SelectItem value="ron">Ron</SelectItem>
                    <SelectItem value="otros">Otros</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="cost_price">Precio de Costo (Bs.)</Label>
                <Input
                  id="cost_price"
                  type="number"
                  value={newProduct.cost_price}
                  onChange={(e) => setNewProduct({...newProduct, cost_price: e.target.value})}
                  placeholder="0.00"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sale_price">Precio de Venta (Bs.)</Label>
                <Input
                  id="sale_price"
                  type="number"
                  value={newProduct.sale_price}
                  onChange={(e) => setNewProduct({...newProduct, sale_price: e.target.value})}
                  placeholder="0.00"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stock">Stock Inicial</Label>
                <Input
                  id="stock"
                  type="number"
                  value={newProduct.stock}
                  onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="min_stock">Stock Mínimo</Label>
                <Input
                  id="min_stock"
                  type="number"
                  value={newProduct.min_stock}
                  onChange={(e) => setNewProduct({...newProduct, min_stock: e.target.value})}
                  placeholder="10"
                />
              </div>
              <div className="space-y-2 col-span-2">
                <Label htmlFor="supplier">Proveedor</Label>
                <Input
                  id="supplier"
                  value={newProduct.supplier}
                  onChange={(e) => setNewProduct({...newProduct, supplier: e.target.value})}
                  placeholder="Nombre del proveedor"
                />
              </div>
              <div className="space-y-2 col-span-2">
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                  id="description"
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                  placeholder="Descripción del producto"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                Cancelar
              </Button>
              <Button onClick={handleAddProduct} className="bg-red-600 hover:bg-red-700">
                Agregar Producto
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                  <Badge 
                    variant={product.stock <= product.min_stock ? "destructive" : "secondary"}
                    className={product.stock <= product.min_stock ? "bg-red-100 text-red-800" : ""}
                  >
                    {product.category}
                  </Badge>
                </div>
                <CardDescription>{product.description || "Sin descripción"}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Precio:</span>
                    <p className="font-semibold text-lg">Bs. {product.sale_price}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Stock:</span>
                    <p className={`font-semibold text-lg ${product.stock <= product.min_stock ? 'text-red-600' : 'text-green-600'}`}>
                      {product.stock}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-600">Margen:</span>
                    <p className="font-semibold text-green-600">{product.margin?.toFixed(1)}%</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Proveedor:</span>
                    <p className="font-semibold">{product.supplier || "N/A"}</p>
                  </div>
                </div>
                
                {product.stock <= product.min_stock && (
                  <div className="flex items-center space-x-2 p-2 bg-red-50 rounded-lg">
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                    <span className="text-sm text-red-800">Stock bajo - Reabastecer</span>
                  </div>
                )}
                
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="w-4 h-4 mr-1" />
                    Ver
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="w-4 h-4 mr-1" />
                    Editar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

// WhatsApp Simulator Component
const WhatsAppSimulator = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [phone, setPhone] = useState("59170000000");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`${API}/whatsapp/messages`);
      setMessages(response.data);
    } catch (error) {
      toast.error("Error al cargar mensajes");
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim()) return;
    
    setLoading(true);
    try {
      const response = await axios.post(`${API}/whatsapp/process`, null, {
        params: { phone, message: newMessage }
      });
      
      setNewMessage("");
      fetchMessages();
      toast.success("Mensaje procesado");
    } catch (error) {
      toast.error("Error al procesar mensaje");
    } finally {
      setLoading(false);
    }
  };

  const quickCommands = [
    { command: "/menu", description: "Ver menú de comandos" },
    { command: "/stock Cerveza", description: "Consultar stock de cerveza" },
    { command: "/reporte ventas", description: "Reporte de ventas" },
    { command: "/productos", description: "Ver catálogo" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Simulador WhatsApp Business</h1>
        <Button onClick={fetchMessages} variant="outline">
          Actualizar
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat Interface */}
        <div className="lg:col-span-2">
          <Card className="h-[600px] flex flex-col">
            <CardHeader className="bg-green-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="w-5 h-5" />
                <span>WhatsApp Business - Tambar Express</span>
              </CardTitle>
              <CardDescription className="text-green-100">
                Simule conversaciones con clientes
              </CardDescription>
            </CardHeader>
            
            <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.slice(0, 20).map((message) => (
                <div key={message.id} className="space-y-2">
                  {/* Incoming message */}
                  <div className="flex">
                    <div className="bg-white p-3 rounded-lg shadow-sm max-w-xs">
                      <div className="text-xs text-gray-500 mb-1">{message.phone}</div>
                      <div className="text-sm">{message.message}</div>
                      <div className="text-xs text-gray-400 mt-1">
                        {new Date(message.created_at).toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                  
                  {/* Response */}
                  {message.response && (
                    <div className="flex justify-end">
                      <div className="bg-green-500 text-white p-3 rounded-lg shadow-sm max-w-xs">
                        <div className="text-sm">{message.response}</div>
                        <div className="text-xs text-green-100 mt-1">
                          {new Date(message.created_at).toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
            
            <div className="p-4 border-t bg-white rounded-b-lg">
              <div className="flex space-x-2 mb-2">
                <Input
                  placeholder="Número de teléfono"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-40"
                />
                <Input
                  placeholder="Escriba su mensaje..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  className="flex-1"
                />
                <Button 
                  onClick={sendMessage}
                  disabled={loading}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Commands Panel */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Comandos Rápidos</CardTitle>
              <CardDescription>Pruebe estos comandos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {quickCommands.map((cmd, index) => (
                <div 
                  key={index}
                  className="p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => setNewMessage(cmd.command)}
                >
                  <div className="font-mono text-sm text-green-600">{cmd.command}</div>
                  <div className="text-xs text-gray-600">{cmd.description}</div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Estadísticas WhatsApp</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Mensajes Totales:</span>
                  <span className="font-semibold">{messages.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Comandos Procesados:</span>
                  <span className="font-semibold">
                    {messages.filter(m => m.command).length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Estado:</span>
                  <Badge className="bg-green-100 text-green-800">Activo</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

// Marketing Component
const Marketing = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const platforms = [
    { name: "Facebook", color: "bg-blue-600", icon: "📘" },
    { name: "Instagram", color: "bg-pink-600", icon: "📷" },
    { name: "TikTok", color: "bg-black", icon: "🎵" },
    { name: "WhatsApp", color: "bg-green-600", icon: "📱" }
  ];

  const createAd = async (platform) => {
    setLoading(true);
    try {
      const response = await axios.post(`${API}/social-media/create-ad`, null, {
        params: { platform }
      });
      toast.success(`Anuncio creado para ${platform}`);
      fetchPosts();
    } catch (error) {
      toast.error("Error al crear anuncio");
    } finally {
      setLoading(false);
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${API}/social-media/posts`);
      setPosts(response.data);
    } catch (error) {
      toast.error("Error al cargar publicaciones");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Marketing Digital</h1>
        <Button onClick={fetchPosts} variant="outline">
          Actualizar
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {platforms.map((platform) => (
          <Card key={platform.name} className="hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span className="text-2xl">{platform.icon}</span>
                <span>{platform.name}</span>
              </CardTitle>
              <CardDescription>Crear anuncio automático</CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => createAd(platform.name.toLowerCase())}
                disabled={loading}
                className={`w-full ${platform.color} hover:opacity-90`}
              >
                <Share2 className="w-4 h-4 mr-2" />
                Crear Anuncio
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Publicaciones Recientes</CardTitle>
          <CardDescription>Historial de anuncios creados</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {posts.slice(0, 10).map((post) => (
              <div key={post.id} className="border rounded-lg p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline" className="capitalize">
                    {post.platform}
                  </Badge>
                  <span className="text-sm text-gray-500">
                    {new Date(post.created_at).toLocaleDateString()}
                  </span>
                </div>
                <div className="text-sm text-gray-700 mb-3">
                  {post.content.substring(0, 200)}...
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>👍 {post.engagement?.likes || 0} likes</span>
                  <span>🔄 {post.engagement?.shares || 0} shares</span>
                  <span>💬 {post.engagement?.comments || 0} comentarios</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Orders Component
const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [newOrder, setNewOrder] = useState({
    customer_id: "",
    items: [],
    delivery_address: "",
    payment_method: "efectivo",
    notes: ""
  });
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [ordersRes, customersRes, productsRes] = await Promise.all([
        axios.get(`${API}/orders`),
        axios.get(`${API}/customers`),
        axios.get(`${API}/products`)
      ]);
      setOrders(ordersRes.data);
      setCustomers(customersRes.data);
      setProducts(productsRes.data);
    } catch (error) {
      toast.error("Error al cargar datos");
    } finally {
      setLoading(false);
    }
  };

  const addItemToOrder = (productId, quantity) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItemIndex = selectedItems.findIndex(item => item.product_id === productId);
    if (existingItemIndex >= 0) {
      const updatedItems = [...selectedItems];
      updatedItems[existingItemIndex].quantity += quantity;
      setSelectedItems(updatedItems);
    } else {
      setSelectedItems([...selectedItems, { product_id: productId, quantity }]);
    }
  };

  const removeItemFromOrder = (productId) => {
    setSelectedItems(selectedItems.filter(item => item.product_id !== productId));
  };

  const calculateOrderTotal = () => {
    let subtotal = 0;
    selectedItems.forEach(item => {
      const product = products.find(p => p.id === item.product_id);
      if (product) {
        subtotal += product.sale_price * item.quantity;
      }
    });
    const iva = subtotal * 0.13;
    const it = subtotal * 0.03;
    return { subtotal, iva, it, total: subtotal + iva + it };
  };

  const handleCreateOrder = async () => {
    if (!newOrder.customer_id || selectedItems.length === 0) {
      toast.error("Seleccione un cliente y agregue productos");
      return;
    }

    try {
      await axios.post(`${API}/orders`, {
        ...newOrder,
        items: selectedItems
      });
      toast.success("Pedido creado exitosamente");
      setShowCreateDialog(false);
      setNewOrder({
        customer_id: "",
        items: [],
        delivery_address: "",
        payment_method: "efectivo",
        notes: ""
      });
      setSelectedItems([]);
      fetchData();
    } catch (error) {
      toast.error("Error al crear pedido");
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      await axios.put(`${API}/orders/${orderId}/status`, { status });
      toast.success(`Estado actualizado a ${status}`);
      fetchData();
    } catch (error) {
      toast.error("Error al actualizar estado");
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pendiente: { color: "bg-yellow-100 text-yellow-800", label: "Pendiente" },
      confirmado: { color: "bg-blue-100 text-blue-800", label: "Confirmado" },
      en_preparacion: { color: "bg-purple-100 text-purple-800", label: "En Preparación" },
      en_entrega: { color: "bg-orange-100 text-orange-800", label: "En Entrega" },
      entregado: { color: "bg-green-100 text-green-800", label: "Entregado" },
      cancelado: { color: "bg-red-100 text-red-800", label: "Cancelado" }
    };
    const config = statusConfig[status] || statusConfig.pendiente;
    return <Badge className={`${config.color} text-xs`}>{config.label}</Badge>;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  const orderTotals = calculateOrderTotal();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Gestión de Pedidos</h1>
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button className="bg-red-600 hover:bg-red-700">
              <Plus className="w-4 h-4 mr-2" />
              Nuevo Pedido
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Crear Nuevo Pedido</DialogTitle>
              <DialogDescription>Complete la información del pedido</DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Cliente</Label>
                  <Select value={newOrder.customer_id} onValueChange={(value) => setNewOrder({...newOrder, customer_id: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar cliente" />
                    </SelectTrigger>
                    <SelectContent>
                      {customers.map(customer => (
                        <SelectItem key={customer.id} value={customer.id}>
                          {customer.name} - {customer.phone}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Dirección de Entrega</Label>
                  <Textarea
                    value={newOrder.delivery_address}
                    onChange={(e) => setNewOrder({...newOrder, delivery_address: e.target.value})}
                    placeholder="Dirección completa para entrega"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Método de Pago</Label>
                  <Select value={newOrder.payment_method} onValueChange={(value) => setNewOrder({...newOrder, payment_method: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="efectivo">Efectivo</SelectItem>
                      <SelectItem value="qr">QR Code</SelectItem>
                      <SelectItem value="tigo_money">Tigo Money</SelectItem>
                      <SelectItem value="banco">Transferencia Bancaria</SelectItem>
                      <SelectItem value="tarjeta">Tarjeta</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Notas</Label>
                  <Textarea
                    value={newOrder.notes}
                    onChange={(e) => setNewOrder({...newOrder, notes: e.target.value})}
                    placeholder="Notas adicionales del pedido"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <Label>Productos</Label>
                <div className="border rounded-lg p-4 max-h-60 overflow-y-auto">
                  {products.map(product => (
                    <div key={product.id} className="flex items-center justify-between py-2 border-b last:border-b-0">
                      <div className="flex-1">
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-gray-600">Bs. {product.sale_price} (Stock: {product.stock})</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => addItemToOrder(product.id, 1)}
                          disabled={product.stock === 0}
                        >
                          +1
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                
                {selectedItems.length > 0 && (
                  <div className="border rounded-lg p-4">
                    <Label className="text-sm font-medium">Items Seleccionados:</Label>
                    {selectedItems.map(item => {
                      const product = products.find(p => p.id === item.product_id);
                      return (
                        <div key={item.product_id} className="flex items-center justify-between py-1">
                          <span className="text-sm">{product?.name} x{item.quantity}</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm">Bs. {((product?.sale_price || 0) * item.quantity).toFixed(2)}</span>
                            <Button size="sm" variant="outline" onClick={() => removeItemFromOrder(item.product_id)}>
                              <Trash className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                    <div className="mt-3 pt-3 border-t space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Subtotal:</span>
                        <span>Bs. {orderTotals.subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>IVA (13%):</span>
                        <span>Bs. {orderTotals.iva.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>IT (3%):</span>
                        <span>Bs. {orderTotals.it.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between font-bold">
                        <span>Total:</span>
                        <span>Bs. {orderTotals.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                Cancelar
              </Button>
              <Button onClick={handleCreateOrder} className="bg-red-600 hover:bg-red-700">
                Crear Pedido
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {orders.length === 0 ? (
        <Card className="p-8 text-center">
          <ShoppingCart className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No hay pedidos</h3>
          <p className="text-gray-600 mb-4">Comience creando su primer pedido</p>
          <Button onClick={() => setShowCreateDialog(true)} className="bg-red-600 hover:bg-red-700">
            Crear Primer Pedido
          </Button>
        </Card>
      ) : (
        <div className="space-y-4">
          {orders.map(order => (
            <Card key={order.id} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold">Pedido #{order.id.slice(-8)}</h3>
                  <p className="text-gray-600">{order.customer_name} - {order.customer_phone}</p>
                </div>
                <div className="text-right">
                  {getStatusBadge(order.status)}
                  <p className="text-sm text-gray-600 mt-1">
                    {new Date(order.created_at).toLocaleDateString('es-BO')}
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h4 className="font-medium mb-2">Productos:</h4>
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm py-1">
                      <span>{item.product_name} x{item.quantity}</span>
                      <span>Bs. {item.total_price.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div>
                  <h4 className="font-medium mb-2">Detalles:</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>Bs. {order.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>IVA (13%):</span>
                      <span>Bs. {order.iva.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>IT (3%):</span>
                      <span>Bs. {order.it.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold">
                      <span>Total:</span>
                      <span>Bs. {order.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {order.delivery_address && (
                <div className="mb-4">
                  <h4 className="font-medium mb-1">Dirección de Entrega:</h4>
                  <p className="text-sm text-gray-600">{order.delivery_address}</p>
                </div>
              )}

              {order.qr_code && (
                <div className="mb-4">
                  <div className="flex items-center space-x-2">
                    <QrCode className="w-4 h-4" />
                    <span className="text-sm">Código QR: {order.qr_code}</span>
                  </div>
                </div>
              )}

              <div className="flex space-x-2">
                {order.status === 'pendiente' && (
                  <Button size="sm" onClick={() => updateOrderStatus(order.id, 'confirmado')}>
                    Confirmar
                  </Button>
                )}
                {order.status === 'confirmado' && (
                  <Button size="sm" onClick={() => updateOrderStatus(order.id, 'en_preparacion')}>
                    En Preparación
                  </Button>
                )}
                {order.status === 'en_preparacion' && (
                  <Button size="sm" onClick={() => updateOrderStatus(order.id, 'en_entrega')}>
                    En Entrega
                  </Button>
                )}
                {order.status === 'en_entrega' && (
                  <Button size="sm" onClick={() => updateOrderStatus(order.id, 'entregado')}>
                    Entregado
                  </Button>
                )}
                {order.status !== 'cancelado' && order.status !== 'entregado' && (
                  <Button size="sm" variant="outline" onClick={() => updateOrderStatus(order.id, 'cancelado')}>
                    Cancelar
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

// Customers Component
const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    phone: "",
    email: "",
    address: ""
  });

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get(`${API}/customers`);
      setCustomers(response.data);
    } catch (error) {
      toast.error("Error al cargar clientes");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCustomer = async () => {
    try {
      await axios.post(`${API}/customers`, newCustomer);
      toast.success("Cliente creado exitosamente");
      setShowCreateDialog(false);
      setNewCustomer({ name: "", phone: "", email: "", address: "" });
      fetchCustomers();
    } catch (error) {
      toast.error("Error al crear cliente");
    }
  };

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm)
  );

  const getCustomerLevel = (loyaltyPoints) => {
    if (loyaltyPoints >= 100) return { level: "Oro", color: "bg-yellow-100 text-yellow-800" };
    if (loyaltyPoints >= 50) return { level: "Plata", color: "bg-gray-100 text-gray-800" };
    return { level: "Bronce", color: "bg-orange-100 text-orange-800" };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Gestión de Clientes</h1>
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button className="bg-red-600 hover:bg-red-700">
              <Plus className="w-4 h-4 mr-2" />
              Nuevo Cliente
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Agregar Nuevo Cliente</DialogTitle>
              <DialogDescription>Complete la información del cliente</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Nombre Completo</Label>
                <Input
                  value={newCustomer.name}
                  onChange={(e) => setNewCustomer({...newCustomer, name: e.target.value})}
                  placeholder="Ej: Juan Pérez"
                />
              </div>
              <div className="space-y-2">
                <Label>Teléfono</Label>
                <Input
                  value={newCustomer.phone}
                  onChange={(e) => setNewCustomer({...newCustomer, phone: e.target.value})}
                  placeholder="Ej: 59170000000"
                />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  value={newCustomer.email}
                  onChange={(e) => setNewCustomer({...newCustomer, email: e.target.value})}
                  placeholder="Ej: juan@email.com"
                />
              </div>
              <div className="space-y-2">
                <Label>Dirección</Label>
                <Textarea
                  value={newCustomer.address}
                  onChange={(e) => setNewCustomer({...newCustomer, address: e.target.value})}
                  placeholder="Dirección completa"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                Cancelar
              </Button>
              <Button onClick={handleCreateCustomer} className="bg-red-600 hover:bg-red-700">
                Crear Cliente
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Buscar clientes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {filteredCustomers.length === 0 ? (
        <Card className="p-8 text-center">
          <Users className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No hay clientes</h3>
          <p className="text-gray-600 mb-4">Comience agregando su primer cliente</p>
          <Button onClick={() => setShowCreateDialog(true)} className="bg-red-600 hover:bg-red-700">
            Agregar Primer Cliente
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCustomers.map(customer => {
            const customerLevel = getCustomerLevel(customer.loyalty_points);
            return (
              <Card key={customer.id} className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{customer.name}</CardTitle>
                    <Badge className={`${customerLevel.color} text-xs`}>
                      {customerLevel.level}
                    </Badge>
                  </div>
                  <CardDescription>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4" />
                      <span>{customer.phone}</span>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Email:</span>
                      <p className="font-semibold">{customer.email || "No registrado"}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Puntos:</span>
                      <p className="font-semibold text-purple-600">{customer.loyalty_points}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Total Compras:</span>
                      <p className="font-semibold text-green-600">Bs. {customer.total_purchases.toFixed(2)}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Cliente desde:</span>
                      <p className="font-semibold">{new Date(customer.created_at).toLocaleDateString('es-BO')}</p>
                    </div>
                  </div>
                  
                  {customer.address && (
                    <div>
                      <span className="text-gray-600 text-sm">Dirección:</span>
                      <p className="text-sm">{customer.address}</p>
                    </div>
                  )}

                  {customer.preferred_products && customer.preferred_products.length > 0 && (
                    <div>
                      <span className="text-gray-600 text-sm">Productos Favoritos:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {customer.preferred_products.slice(0, 2).map((product, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {product.length > 15 ? product.slice(0, 15) + '...' : product}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex space-x-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit className="w-4 h-4 mr-1" />
                      Editar
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="w-4 h-4 mr-1" />
                      Historial
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

function App() {
  return (
    <div className="App bg-gray-50 min-h-screen">
      <BrowserRouter>
        <Navigation />
        <main className="ml-64 p-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/whatsapp" element={<WhatsAppSimulator />} />
            <Route path="/marketing" element={<Marketing />} />
          </Routes>
        </main>
      </BrowserRouter>
      <Toaster position="top-right" />
    </div>
  );
}

export default App;