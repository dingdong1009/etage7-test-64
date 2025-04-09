
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent
} from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Upload, 
  Plus, 
  FileText, 
  Image, 
  Tag, 
  DollarSign, 
  Package, 
  Truck,
  Palette,
  Search,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Eye,
  ListFilter,
  ArrowUpDown,
  Filter,
  ShoppingBag,
  Printer
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Toggle } from "@/components/ui/toggle";
import { Switch } from "@/components/ui/switch";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const BrandProducts = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedColor, setSelectedColor] = useState("");
  const [activeTab, setActiveTab] = useState("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [seasonFilter, setSeasonFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
  const [orderSearchQuery, setOrderSearchQuery] = useState("");
  
  // Add products state
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Designer Silk Dress",
      sku: "DS-001",
      category: "Dresses",
      season: "Spring/Summer 2025",
      color: "Primary Purple",
      price: 299.99,
      status: "active",
      description: "Elegant silk dress for special occasions"
    },
    {
      id: 2,
      name: "Tailored Wool Blazer",
      sku: "TW-002",
      category: "Outerwear",
      season: "Fall/Winter 2024",
      color: "Dark Purple",
      price: 349.99,
      status: "active",
      description: "Premium wool blazer with custom fit"
    },
    {
      id: 3,
      name: "Casual Linen Pants",
      sku: "CL-003",
      category: "Bottoms",
      season: "Spring/Summer 2025",
      color: "Soft Green",
      price: 129.99,
      status: "draft",
      description: "Comfortable linen pants for everyday wear"
    },
    {
      id: 4,
      name: "Graphic Print T-Shirt",
      sku: "GP-004",
      category: "Tops",
      season: "Resort 2025",
      color: "Soft Blue",
      price: 89.99,
      status: "active",
      description: "Bold graphic print for a statement look"
    }
  ]);

  const orders = [
    { 
      id: "ORD-001", 
      date: "2023-04-01", 
      customer: "John Smith", 
      total: "$129.99", 
      status: "completed",
      items: 3 
    },
    { 
      id: "ORD-002", 
      date: "2023-04-02", 
      customer: "Sarah Johnson", 
      total: "$89.50", 
      status: "processing",
      items: 2 
    },
    { 
      id: "ORD-003", 
      date: "2023-04-03", 
      customer: "Michael Davis", 
      total: "$210.75", 
      status: "completed",
      items: 4 
    },
    { 
      id: "ORD-004", 
      date: "2023-04-05", 
      customer: "Emily Wilson", 
      total: "$45.99", 
      status: "shipped",
      items: 1 
    },
    { 
      id: "ORD-005", 
      date: "2023-04-06", 
      customer: "Robert Brown", 
      total: "$178.25", 
      status: "cancelled",
      items: 3 
    }
  ];

  const colorOptions = [
    { name: "Neutral Gray", hex: "#8E9196" },
    { name: "Primary Purple", hex: "#9b87f5" },
    { name: "Secondary Purple", hex: "#7E69AB" },
    { name: "Tertiary Purple", hex: "#6E59A5" },
    { name: "Dark Purple", hex: "#1A1F2C" },
    { name: "Light Purple", hex: "#D6BCFA" },
    { name: "Soft Green", hex: "#F2FCE2" },
    { name: "Soft Yellow", hex: "#FEF7CD" },
    { name: "Soft Orange", hex: "#FEC6A1" },
    { name: "Soft Purple", hex: "#E5DEFF" },
    { name: "Soft Pink", hex: "#FFDEE2" },
    { name: "Soft Blue", hex: "#D3E4FD" },
    { name: "Vivid Purple", hex: "#8B5CF6" },
    { name: "Magenta Pink", hex: "#D946EF" },
    { name: "Bright Orange", hex: "#F97316" },
    { name: "Ocean Blue", hex: "#0EA5E9" },
    { name: "Charcoal Gray", hex: "#403E43" },
    { name: "Navy Blue", hex: "#1E3A8A" },
    { name: "Burgundy", hex: "#9F1239" },
    { name: "Tan", hex: "#D4A76A" },
  ];

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };
  
  const sortedProducts = [...products].sort((a, b) => {
    if (!sortConfig.key) return 0;
    
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const filteredProducts = sortedProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = categoryFilter ? product.category === categoryFilter : true;
    const matchesSeason = seasonFilter ? product.season === seasonFilter : true;
    const matchesStatus = statusFilter ? product.status === statusFilter : true;
    
    return matchesSearch && matchesCategory && matchesSeason && matchesStatus;
  });

  const toggleProductStatus = (id, newStatus) => {
    setProducts(products.map(product => 
      product.id === id ? { ...product, status: newStatus } : product
    ));
  };

  const deleteProduct = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };

  const filteredOrders = orders.filter(order => 
    order.id.toLowerCase().includes(orderSearchQuery.toLowerCase()) ||
    order.customer.toLowerCase().includes(orderSearchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-4xl md:text-6xl uppercase font-thin mb-6">Products</h1>
        <div className="flex gap-2">
          <Button 
            onClick={() => {
              setShowForm(true);
              setActiveTab("add");
            }} 
            className="h-9 text-xs bg-black hover:bg-black-600 text-white"
          >
            <Plus size={16} className="mr-1" />
            Add Product
          </Button>
          <Button variant="outline" size="sm" className="h-9 text-xs">
            <FileText size={16} className="mr-1" />
            Export
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="list" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full mb-6 grid grid-cols-3 bg-gray-100 p-1">
          <TabsTrigger 
            value="list" 
            className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm"
          >
            <ListFilter className="mr-2 h-4 w-4" /> Product List
          </TabsTrigger>
          <TabsTrigger 
            value="orders" 
            className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm"
          >
            <ShoppingBag className="mr-2 h-4 w-4" /> Orders
          </TabsTrigger>
          <TabsTrigger 
            value="add" 
            className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm"
          >
            <Plus className="mr-2 h-4 w-4" /> Add Product
          </TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-6">
          <Card className="border border-gray-200">
            <CardHeader>
              <CardTitle className="text-1xl md:text-2xl uppercase font-thin">Product Catalog</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <Input 
                    placeholder="Search products..." 
                    className="pl-9" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" size="sm" className="h-10 flex gap-1.5">
                        <Filter className="h-4 w-4" />
                        Filter
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-72 p-4">
                      <div className="space-y-4">
                        <div>
                          <Label className="text-sm">Category</Label>
                          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                            <SelectTrigger className="mt-1.5">
                              <SelectValue placeholder="All categories" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All categories</SelectItem>
                              <SelectItem value="Outerwear">Outerwear</SelectItem>
                              <SelectItem value="Tops">Tops</SelectItem>
                              <SelectItem value="Bottoms">Bottoms</SelectItem>
                              <SelectItem value="Dresses">Dresses</SelectItem>
                              <SelectItem value="Accessories">Accessories</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label className="text-sm">Season</Label>
                          <Select value={seasonFilter} onValueChange={setSeasonFilter}>
                            <SelectTrigger className="mt-1.5">
                              <SelectValue placeholder="All seasons" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All seasons</SelectItem>
                              <SelectItem value="Spring/Summer 2025">Spring/Summer 2025</SelectItem>
                              <SelectItem value="Fall/Winter 2024">Fall/Winter 2024</SelectItem>
                              <SelectItem value="Resort 2025">Resort 2025</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label className="text-sm">Status</Label>
                          <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="mt-1.5">
                              <SelectValue placeholder="All statuses" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All statuses</SelectItem>
                              <SelectItem value="active">Active</SelectItem>
                              <SelectItem value="draft">Draft</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex justify-between">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => {
                              setCategoryFilter("");
                              setSeasonFilter("");
                              setStatusFilter("");
                            }}
                          >
                            Reset
                          </Button>
                          <Button 
                            size="sm" 
                            className="bg-black hover:bg-black-600"
                          >
                            Apply Filters
                          </Button>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="w-[250px] cursor-pointer" onClick={() => handleSort('name')}>
                        <div className="flex items-center">
                          Product Name
                          <ArrowUpDown size={16} className="ml-1.5" />
                        </div>
                      </TableHead>
                      <TableHead className="w-[100px] cursor-pointer" onClick={() => handleSort('sku')}>
                        <div className="flex items-center">
                          SKU
                          <ArrowUpDown size={16} className="ml-1.5" />
                        </div>
                      </TableHead>
                      <TableHead className="cursor-pointer" onClick={() => handleSort('category')}>
                        <div className="flex items-center">
                          Category
                          <ArrowUpDown size={16} className="ml-1.5" />
                        </div>
                      </TableHead>
                      <TableHead className="hidden md:table-cell">Season</TableHead>
                      <TableHead className="hidden md:table-cell">
                        <div className="flex items-center">
                          Colors
                        </div>
                      </TableHead>
                      <TableHead className="cursor-pointer text-right" onClick={() => handleSort('price')}>
                        <div className="flex items-center justify-end">
                          Price
                          <ArrowUpDown size={16} className="ml-1.5" />
                        </div>
                      </TableHead>
                      <TableHead className="w-[100px] cursor-pointer" onClick={() => handleSort('status')}>
                        <div className="flex items-center">
                          Status
                          <ArrowUpDown size={16} className="ml-1.5" />
                        </div>
                      </TableHead>
                      <TableHead className="w-[100px] text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProducts.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} className="h-24 text-center">
                          No products found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredProducts.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell className="font-medium">{product.name}</TableCell>
                          <TableCell>{product.sku}</TableCell>
                          <TableCell>{product.category}</TableCell>
                          <TableCell className="hidden md:table-cell">{product.season}</TableCell>
                          <TableCell className="hidden md:table-cell">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm" className="h-8 px-2 flex items-center gap-2">
                                  <div 
                                    className="h-3 w-3 rounded-full" 
                                    style={{ 
                                      backgroundColor: colorOptions.find(c => c.name === product.color)?.hex || '#000000'
                                    }} 
                                  />
                                  <span className="text-xs">{product.color}</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent className="w-56 max-h-[300px] overflow-y-auto">
                                {colorOptions.map((color) => (
                                  <DropdownMenuItem 
                                    key={color.name}
                                    className="flex items-center gap-2"
                                  >
                                    <div 
                                      className="h-4 w-4 rounded-full" 
                                      style={{ backgroundColor: color.hex }} 
                                    />
                                    <span>{color.name}</span>
                                  </DropdownMenuItem>
                                ))}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                          <TableCell className="text-right">${product.price.toFixed(2)}</TableCell>
                          <TableCell>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              product.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                            }`}>
                              {product.status === 'active' ? 'Active' : 'Draft'}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="flex justify-end gap-1">
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8" 
                                title="View details"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8" 
                                title="Edit product"
                                onClick={() => {
                                  setActiveTab("add");
                                }}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              {product.status === 'active' ? (
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="h-8 w-8" 
                                  title="Deactivate product"
                                  onClick={() => toggleProductStatus(product.id, 'draft')}
                                >
                                  <XCircle className="h-4 w-4 text-red-500" />
                                </Button>
                              ) : (
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="h-8 w-8" 
                                  title="Activate product"
                                  onClick={() => toggleProductStatus(product.id, 'active')}
                                >
                                  <CheckCircle className="h-4 w-4 text-green-500" />
                                </Button>
                              )}
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8" 
                                title="Delete product"
                                onClick={() => deleteProduct(product.id)}
                              >
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders" className="space-y-6">
          <Card className="border border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-1xl md:text-2xl uppercase font-thin mb-6">Recent Orders</CardTitle>
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <input 
                  type="search" 
                  placeholder="Search orders..." 
                  className="w-full rounded-md border border-gray-200 pl-8 py-2 text-sm outline-none focus:border-blue-500"
                  value={orderSearchQuery}
                  onChange={(e) => setOrderSearchQuery(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredOrders.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="h-24 text-center">
                          No orders found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredOrders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">{order.id}</TableCell>
                          <TableCell>{order.date}</TableCell>
                          <TableCell>{order.customer}</TableCell>
                          <TableCell>{order.total}</TableCell>
                          <TableCell>
                            <Badge 
                              className={`${
                                order.status === "completed" ? "bg-green-100 text-green-800" :
                                order.status === "processing" ? "bg-blue-100 text-blue-800" :
                                order.status === "shipped" ? "bg-purple-100 text-purple-800" :
                                "bg-red-100 text-red-800"
                              }`}
                            >
                              {order.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{order.items}</TableCell>
                          <TableCell className="text-right">
                            <TooltipProvider>
                              <div className="flex items-center justify-end space-x-2">
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Link to={`/brand/orders/${order.id}`}>
                                      <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <Eye size={16} />
                                      </Button>
                                    </Link>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>View order details</p>
                                  </TooltipContent>
                                </Tooltip>
                                
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                      <Printer size={16} />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Print order</p>
                                  </TooltipContent>
                                </Tooltip>
                              </div>
                            </TooltipProvider>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
              
              <div className="flex items-center justify-between mt-4">
                <p className="text-sm text-gray-500">Showing {filteredOrders.length} of {orders.length} orders</p>
                <div className="flex space-x-1">
                  <button className="px-2 py-1 text-sm border rounded">Previous</button>
                  <button className="px-2 py-1 text-sm border rounded bg-black-50">1</button>
                  <button className="px-2 py-1 text-sm border rounded">2</button>
                  <button className="px-2 py-1 text-sm border rounded">3</button>
                  <button className="px-2 py-1 text-sm border rounded">Next</button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="add" className="space-y-6 mt-4">
          <Card className="border border-gray-200">
            <CardHeader>
              <CardTitle className="text-1xl md:text-2xl uppercase font-thin mb-6">Add New Products</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border-2 border-dashed border-gray-300 p-8 text-center cursor-pointer hover:bg-gray-50 transition-colors">
                <div className="flex flex-col items-center gap-2">
                  <Upload className="h-10 w-10 text-gray-400" />
                  <h3 className="font-medium">Drag and drop product images here</h3>
                  <p className="text-sm text-gray-500">Or click to browse files</p>
                  <p className="text-xs text-gray-400">Upload high-quality product images with clean backgrounds</p>
                  <input type="file" multiple className="hidden" />
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2 items-center">
                <Button variant="default" className="w-full sm:w-auto bg-black hover:bg-black-600">
                  Mass Upload from CSV
                </Button>
                <Button variant="outline" className="w-full sm:w-auto">
                  Download Template
                </Button>
              </div>
              
              <div className="border p-4">
                <Tabs defaultValue="basic" className="w-full">
                  <TabsList className="w-full mb-6 grid grid-cols-2 md:grid-cols-5 bg-gray-100 p-1">
                    <TabsTrigger 
                      value="basic" 
                      className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm"
                    >
                      <Tag className="mr-2 h-4 w-4" /> Basic Info
                    </TabsTrigger>
                    <TabsTrigger 
                      value="materials" 
                      className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm"
                    >
                      <Image className="mr-2 h-4 w-4" /> Materials
                    </TabsTrigger>
                    <TabsTrigger 
                      value="pricing" 
                      className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm"
                    >
                      <DollarSign className="mr-2 h-4 w-4" /> Pricing
                    </TabsTrigger>
                    <TabsTrigger 
                      value="shipping" 
                      className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm"
                    >
                      <Truck className="mr-2 h-4 w-4" /> Shipping
                    </TabsTrigger>
                    <TabsTrigger 
                      value="details" 
                      className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm"
                    >
                      <Package className="mr-2 h-4 w-4" /> Details
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="basic" className="space-y-6 mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="productName" className="text-sm font-medium">
                          Product Name*
                        </Label>
                        <Input
                          id="productName"
                          placeholder="e.g., Silk Blend Tailored Blazer"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Include key attributes in name (material, style)
                        </p>
                      </div>
                      
                      <div>
                        <Label htmlFor="sku" className="text-sm font-medium">
                          SKU/Style Code*
                        </Label>
                        <Input
                          id="sku"
                          placeholder="e.g., BL-2025-SLK"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Unique identifier for inventory tracking
                        </p>
                      </div>
                      
                      <div>
                        <Label htmlFor="category" className="text-sm font-medium">
                          Category*
                        </Label>
                        <Select>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="outerwear">Outerwear</SelectItem>
                            <SelectItem value="tops">Tops</SelectItem>
                            <SelectItem value="bottoms">Bottoms</SelectItem>
                            <SelectItem value="dresses">Dresses</SelectItem>
                            <SelectItem value="footwear">Footwear</SelectItem>
                            <SelectItem value="accessories">Accessories</SelectItem>
                            <SelectItem value="jewelry">Jewelry</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="designer" className="text-sm font-medium">
                          Designer/Collection
                        </Label>
                        <Input
                          id="designer"
                          placeholder="e.g. Summer 2025 Collection" 
                        />
                      </div>

                      <div className="col-span-1 md:col-span-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="season" className="text-sm font-medium">
                              Season/Year*
                            </Label>
                            <Select>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select season" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="ss25">Spring/Summer 2025</SelectItem>
                                <SelectItem value="fw24">Fall/Winter 2024</SelectItem>
                                <SelectItem value="resort25">Resort 2025</SelectItem>
                                <SelectItem value="pre-fall24">Pre-Fall 2024</SelectItem>
                                <SelectItem value="timeless">Timeless/Non-seasonal</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div>
                            <Label htmlFor="color" className="text-sm font-medium">
                              Colors
                            </Label>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="w-full flex justify-between">
                                  <div className="flex items-center gap-2">
                                    <Palette className="h-4 w-4" />
                                    {selectedColor ? (
                                      <>
                                        <div 
                                          className="h-4 w-4 rounded-full mr-1" 
                                          style={{ backgroundColor: colorOptions.find(c => c.name === selectedColor)?.hex || '#FFFFFF' }} 
                                        />
                                        {selectedColor}
                                      </>
                                    ) : (
                                      "Select color"
                                    )}
                                  </div>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent className="w-56 max-h-[300px] overflow-y-auto">
                                {colorOptions.map((color) => (
                                  <DropdownMenuItem 
                                    key={color.name}
                                    onClick={() => setSelectedColor(color.name)}
                                    className="flex items-center gap-2"
                                  >
                                    <div 
                                      className="h-4 w-4 rounded-full" 
                                      style={{ backgroundColor: color.hex }} 
                                    />
                                    <span>{color.name}</span>
                                  </DropdownMenuItem>
                                ))}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BrandProducts;
