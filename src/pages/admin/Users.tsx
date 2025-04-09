
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { ChevronLeft, Plus } from "lucide-react";

interface Brand {
  id: number;
  name: string;
  status: "active" | "pending" | "inactive";
  plan: string;
  lastActivity: string;
  contactPerson: string;
  email: string;
  phone: string;
  website: string;
  description: string;
  marketSegment: string;
  productsCount: number;
  activeSince: string;
  avgOrderValue: string;
  totalSales: string;
}

interface Buyer {
  id: number;
  name: string;
  status: "active" | "pending" | "inactive";
  plan: string;
  lastActivity: string;
  contactPerson: string;
  email: string;
  phone: string;
  website: string;
  description: string;
  marketSegment: string;
  storeCount: number;
  activeSince: string;
  avgOrderValue: string;
  annualPurchases: string;
}

interface SalesManager {
  id: number;
  name: string;
  status: "active" | "pending" | "inactive";
  lastActivity: string;
  email: string;
  phone: string;
  description: string;
  seniorityLevel: string;
  region: string;
  managedAccounts: number;
  activeSince: string;
  monthlyTarget: string;
  quarterlyPerformance: string;
}

type UserType = "brand" | "buyer" | "salesManager";
type ViewMode = "list" | "view" | "edit" | "add";

const SalesUsers = () => {
  const [activeTab, setActiveTab] = useState<UserType>("brand");
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [selectedUser, setSelectedUser] = useState<Brand | Buyer | SalesManager | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  
  const brands: Brand[] = [
    { 
      id: 1, 
      name: "Luxury Brands Inc.", 
      status: "active", 
      plan: "Premium", 
      lastActivity: "2 hours ago",
      contactPerson: "John Smith",
      email: "john@luxurybrandsinc.com",
      phone: "+1 (555) 123-4567",
      website: "luxurybrandsinc.com",
      description: "Leading luxury fashion and accessories brand focused on high-end retail market",
      marketSegment: "Luxury Apparel",
      productsCount: 245,
      activeSince: "June 2018",
      avgOrderValue: "$2,500",
      totalSales: "$1.2M"
    },
    { 
      id: 2, 
      name: "Fashion Forward Co.", 
      status: "active", 
      plan: "Professional", 
      lastActivity: "1 day ago",
      contactPerson: "Emily Johnson",
      email: "emily@fashionforward.co",
      phone: "+1 (555) 234-5678",
      website: "fashionforward.co",
      description: "Contemporary fashion brand targeting young professionals",
      marketSegment: "Contemporary Fashion",
      productsCount: 178,
      activeSince: "March 2019",
      avgOrderValue: "$750",
      totalSales: "$890K"
    },
    { 
      id: 3, 
      name: "Elegant Styles Ltd.", 
      status: "pending", 
      plan: "Basic", 
      lastActivity: "3 days ago",
      contactPerson: "Michael Williams",
      email: "michael@elegantstyles.com",
      phone: "+1 (555) 345-6789",
      website: "elegantstyles.com",
      description: "Classic formal wear and evening attire for special occasions",
      marketSegment: "Formal Wear",
      productsCount: 85,
      activeSince: "November 2020",
      avgOrderValue: "$1,200",
      totalSales: "$430K"
    },
    { 
      id: 4, 
      name: "Heritage Designs", 
      status: "active", 
      plan: "Premium", 
      lastActivity: "5 hours ago",
      contactPerson: "Sarah Brown",
      email: "sarah@heritagedesigns.com",
      phone: "+1 (555) 456-7890",
      website: "heritagedesigns.com",
      description: "Traditional and heritage-inspired clothing with modern touches",
      marketSegment: "Heritage Fashion",
      productsCount: 132,
      activeSince: "April 2017",
      avgOrderValue: "$950",
      totalSales: "$1.5M"
    },
    { 
      id: 5, 
      name: "Modern Collections", 
      status: "inactive", 
      plan: "Basic", 
      lastActivity: "2 weeks ago",
      contactPerson: "David Lee",
      email: "david@moderncollections.com",
      phone: "+1 (555) 567-8901",
      website: "moderncollections.com",
      description: "Minimalist modern fashion focusing on sustainable materials",
      marketSegment: "Sustainable Fashion",
      productsCount: 67,
      activeSince: "September 2021",
      avgOrderValue: "$500",
      totalSales: "$210K"
    }
  ];

  const buyers: Buyer[] = [
    { 
      id: 1, 
      name: "Department Store Group", 
      status: "active", 
      plan: "Enterprise", 
      lastActivity: "1 hour ago",
      contactPerson: "Robert Chen",
      email: "robert@departmentstoregroup.com",
      phone: "+1 (555) 678-9012",
      website: "departmentstoregroup.com",
      description: "National chain of premium department stores operating in major cities",
      marketSegment: "Department Stores",
      storeCount: 35,
      activeSince: "January 2015",
      avgOrderValue: "$45,000",
      annualPurchases: "$12M"
    },
    { 
      id: 2, 
      name: "Boutique Network LLC", 
      status: "active", 
      plan: "Professional", 
      lastActivity: "3 days ago",
      contactPerson: "Amanda Taylor",
      email: "amanda@boutiquenetwork.com",
      phone: "+1 (555) 789-0123",
      website: "boutiquenetwork.com",
      description: "Collective of upscale boutiques specializing in designer fashion",
      marketSegment: "Boutiques",
      storeCount: 12,
      activeSince: "May 2018",
      avgOrderValue: "$15,000",
      annualPurchases: "$2.5M"
    },
    { 
      id: 3, 
      name: "Global Retail Partners", 
      status: "pending", 
      plan: "Premium", 
      lastActivity: "1 week ago",
      contactPerson: "James Wilson",
      email: "james@globalretail.com",
      phone: "+1 (555) 890-1234",
      website: "globalretailpartners.com",
      description: "International retail group with presence in luxury malls worldwide",
      marketSegment: "International Retail",
      storeCount: 28,
      activeSince: "August 2017",
      avgOrderValue: "$32,000",
      annualPurchases: "$8.7M"
    },
    { 
      id: 4, 
      name: "Fashion Outlets Inc.", 
      status: "active", 
      plan: "Enterprise", 
      lastActivity: "12 hours ago",
      contactPerson: "Elizabeth Moore",
      email: "elizabeth@fashionoutlets.com",
      phone: "+1 (555) 901-2345",
      website: "fashionoutlets.com",
      description: "Operator of premium outlet malls featuring designer brands",
      marketSegment: "Outlet Retail",
      storeCount: 18,
      activeSince: "March 2016",
      avgOrderValue: "$28,000",
      annualPurchases: "$6.2M"
    },
    { 
      id: 5, 
      name: "Luxury Retail Alliance", 
      status: "inactive", 
      plan: "Basic", 
      lastActivity: "1 month ago",
      contactPerson: "Thomas Garcia",
      email: "thomas@luxuryretail.org",
      phone: "+1 (555) 012-3456",
      website: "luxuryretailalliance.org",
      description: "Consortium of high-end retailers focused on luxury goods market",
      marketSegment: "Luxury Retail",
      storeCount: 7,
      activeSince: "October 2019",
      avgOrderValue: "$18,000",
      annualPurchases: "$1.4M"
    }
  ];

  const salesManagers: SalesManager[] = [
    { 
      id: 1, 
      name: "Jessica Thompson", 
      status: "active", 
      lastActivity: "30 minutes ago",
      email: "jessica@etage7.com",
      phone: "+1 (555) 123-4567",
      description: "Senior sales manager specializing in luxury brand accounts",
      seniorityLevel: "Senior",
      region: "North America",
      managedAccounts: 12,
      activeSince: "March 2017",
      monthlyTarget: "$500K",
      quarterlyPerformance: "105%"
    },
    { 
      id: 2, 
      name: "Marcus Rodriguez", 
      status: "active", 
      lastActivity: "2 hours ago",
      email: "marcus@etage7.com",
      phone: "+1 (555) 234-5678",
      description: "Mid-level sales manager focused on department store accounts",
      seniorityLevel: "Mid-level",
      region: "Europe",
      managedAccounts: 8,
      activeSince: "June 2019",
      monthlyTarget: "$350K",
      quarterlyPerformance: "98%"
    },
    { 
      id: 3, 
      name: "Aisha Johnson", 
      status: "pending", 
      lastActivity: "2 days ago",
      email: "aisha@etage7.com",
      phone: "+1 (555) 345-6789",
      description: "New sales manager currently onboarding with initial client portfolio",
      seniorityLevel: "Junior",
      region: "Asia Pacific",
      managedAccounts: 5,
      activeSince: "January 2023",
      monthlyTarget: "$200K",
      quarterlyPerformance: "87%"
    },
    { 
      id: 4, 
      name: "Richard Chen", 
      status: "active", 
      lastActivity: "1 day ago",
      email: "richard@etage7.com",
      phone: "+1 (555) 456-7890",
      description: "Senior sales manager with expertise in international markets",
      seniorityLevel: "Senior",
      region: "Global",
      managedAccounts: 15,
      activeSince: "April 2016",
      monthlyTarget: "$650K",
      quarterlyPerformance: "112%"
    },
    { 
      id: 5, 
      name: "Sarah Miller", 
      status: "inactive", 
      lastActivity: "3 weeks ago",
      email: "sarah@etage7.com",
      phone: "+1 (555) 567-8901",
      description: "Sales manager currently on extended leave",
      seniorityLevel: "Mid-level",
      region: "Middle East",
      managedAccounts: 7,
      activeSince: "August 2020",
      monthlyTarget: "$300K",
      quarterlyPerformance: "92%"
    }
  ];

  const addUserForm = useForm({
    defaultValues: {
      contactPerson: "",
      email: "",
      phone: "",
      companyName: "",
      description: "",
      marketSegment: "",
      website: "",
      userType: activeTab,
      productsCount: 0,
      activeSince: "",
      avgOrderValue: "",
      totalSales: "",
      storeCount: 0,
      annualPurchases: "",
      // Sales manager specific fields
      name: "",
      seniorityLevel: "",
      region: "",
      managedAccounts: 0,
      monthlyTarget: "",
      quarterlyPerformance: ""
    }
  });

  const editUserForm = useForm({
    defaultValues: {
      id: 0,
      name: "",
      status: "active" as "active" | "pending" | "inactive",
      plan: "",
      contactPerson: "",
      email: "",
      phone: "",
      website: "",
      description: "",
      marketSegment: "",
      productsCount: 0,
      activeSince: "",
      avgOrderValue: "",
      totalSales: "",
      storeCount: 0,
      annualPurchases: "",
      // Sales manager specific fields
      seniorityLevel: "",
      region: "",
      managedAccounts: 0,
      monthlyTarget: "",
      quarterlyPerformance: ""
    }
  });

  const handleAddUserSubmit = (data) => {
    console.log("Form submitted:", data);
    setViewMode("list");
    addUserForm.reset();
  };

  const handleEditUserSubmit = (data) => {
    console.log("Edit form submitted:", data);
    setViewMode("list");
  };

  const handleGoBack = () => {
    setViewMode("list");
    setSelectedUser(null);
  };

  const handleViewUser = (userType: UserType, userId: number) => {
    let userList;
    if (userType === "brand") {
      userList = brands;
    } else if (userType === "buyer") {
      userList = buyers;
    } else {
      userList = salesManagers;
    }
    
    const user = userList.find(u => u.id === userId);
    
    if (user) {
      setSelectedUser(user);
      setViewMode("view");
    }
  };

  const handleEditUser = (userType: UserType, userId: number) => {
    let userList;
    if (userType === "brand") {
      userList = brands;
    } else if (userType === "buyer") {
      userList = buyers;
    } else {
      userList = salesManagers;
    }
    
    const user = userList.find(u => u.id === userId);
    
    if (user) {
      setSelectedUser(user);
      editUserForm.reset({
        ...user,
        status: user.status
      });
      setViewMode("edit");
    }
  };

  const handleAddUser = () => {
    addUserForm.setValue("userType", activeTab);
    setViewMode("add");
  };

  const isBrand = (user: any): user is Brand => {
    return 'productsCount' in user && 'totalSales' in user;
  };

  const isBuyer = (user: any): user is Buyer => {
    return 'storeCount' in user && 'annualPurchases' in user;
  };

  const isSalesManager = (user: any): user is SalesManager => {
    return 'quarterlyPerformance' in user && 'seniorityLevel' in user;
  };

  const renderListView = (userType: UserType) => {
    let userList;
    if (userType === "brand") {
      userList = brands;
    } else if (userType === "buyer") {
      userList = buyers;
    } else {
      userList = salesManagers;
    }
    
    const filteredUsers = statusFilter === "all" 
      ? userList 
      : userList.filter(user => user.status.toLowerCase() === statusFilter.toLowerCase());
    
    return (
      <Card className="border border-gray-200">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between pb-2">
          <CardTitle className="text-1xl md:text-2xl uppercase font-thin mb-6">
            {userType === "brand" ? "Managed Brands" : 
             userType === "buyer" ? "Managed Buyers" : 
             "Sales Managers"}
          </CardTitle>
          <div className="flex items-center space-x-2 mt-2 sm:mt-0">
            <Select
              value={statusFilter}
              onValueChange={(value) => setStatusFilter(value)}
            >
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <Button className="bg-black text-white border-none" onClick={handleAddUser}>
              <Plus className="mr-1 h-4 w-4" /> Add User
            </Button>
            <Button className="bg-grey-200 text-black border hover:text-white">Export</Button>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Status</TableHead>
                  {userType !== "salesManager" && <TableHead>Plan</TableHead>}
                  {userType === "salesManager" && <TableHead>Level</TableHead>}
                  <TableHead>Last Activity</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.id}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>
                      <Badge 
                        className={`${
                          user.status === "active" ? "bg-green-100 text-green-800" :
                          user.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                          "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {user.status}
                      </Badge>
                    </TableCell>
                    {userType !== "salesManager" && <TableCell>{user.plan}</TableCell>}
                    {userType === "salesManager" && <TableCell>{(user as SalesManager).seniorityLevel}</TableCell>}
                    <TableCell>{user.lastActivity}</TableCell>
                    <TableCell className="flex justify-end space-x-2">
                      <Button 
                        className="text-xs text-black px-2 py-1 bg-gray-100 rounded hover:text-white"
                        onClick={() => handleViewUser(userType, user.id)}
                      >
                        View
                      </Button>
                      <Button 
                        className="text-xs text-black px-2 py-1 bg-gray-100 rounded hover:text-white"
                        onClick={() => handleEditUser(userType, user.id)}
                      >
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderViewUser = () => {
    if (!selectedUser) return null;
    
    return (
      <Card className="border border-gray-200">
        <CardHeader className="flex items-center justify-between pb-2">
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleGoBack}
              className="bg-gray-100 hover:bg-gray-200"
            >
              <ChevronLeft className="mr-1 h-4 w-4" /> Back
            </Button>
            <CardTitle className="text-1xl md:text-2xl uppercase font-thin">
              {selectedUser.name}
            </CardTitle>
          </div>
          <Button 
            className="text-xs text-black px-3 py-1.5 bg-gray-100 rounded hover:text-white"
            onClick={() => handleEditUser(activeTab, selectedUser.id)}
          >
            Edit
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">
                {isSalesManager(selectedUser) ? "Manager Information" : "Company Information"}
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">
                    {isSalesManager(selectedUser) ? "Name" : "Company Name"}
                  </p>
                  <p>{selectedUser.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <Badge 
                    className={`${
                      selectedUser.status === "active" ? "bg-green-100 text-green-800" :
                      selectedUser.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                      "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {selectedUser.status}
                  </Badge>
                </div>
                {(isBrand(selectedUser) || isBuyer(selectedUser)) && (
                  <div>
                    <p className="text-sm text-gray-500">Plan</p>
                    <p>{selectedUser.plan}</p>
                  </div>
                )}
                {isSalesManager(selectedUser) && (
                  <div>
                    <p className="text-sm text-gray-500">Seniority Level</p>
                    <p>{selectedUser.seniorityLevel}</p>
                  </div>
                )}
                {(isBrand(selectedUser) || isBuyer(selectedUser)) && (
                  <div>
                    <p className="text-sm text-gray-500">Market Segment</p>
                    <p>{selectedUser.marketSegment}</p>
                  </div>
                )}
                {(isBrand(selectedUser) || isBuyer(selectedUser)) && (
                  <div>
                    <p className="text-sm text-gray-500">Website</p>
                    <p>{selectedUser.website}</p>
                  </div>
                )}
                {isSalesManager(selectedUser) && (
                  <div>
                    <p className="text-sm text-gray-500">Region</p>
                    <p>{selectedUser.region}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-gray-500">Active Since</p>
                  <p>{selectedUser.activeSince}</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
              <div className="space-y-4">
                {(isBrand(selectedUser) || isBuyer(selectedUser)) && (
                  <div>
                    <p className="text-sm text-gray-500">Contact Person</p>
                    <p>{selectedUser.contactPerson}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p>{selectedUser.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p>{selectedUser.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Last Activity</p>
                  <p>{selectedUser.lastActivity}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Description</h3>
            <p className="text-gray-700 mb-8">{selectedUser.description}</p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Performance Metrics</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {isBrand(selectedUser) && (
                <>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Products Count</p>
                    <p className="text-2xl font-semibold">{selectedUser.productsCount}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Average Order Value</p>
                    <p className="text-2xl font-semibold">{selectedUser.avgOrderValue}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Total Sales</p>
                    <p className="text-2xl font-semibold">{selectedUser.totalSales}</p>
                  </div>
                </>
              )}
              
              {isBuyer(selectedUser) && (
                <>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Store Count</p>
                    <p className="text-2xl font-semibold">{selectedUser.storeCount}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Average Order Value</p>
                    <p className="text-2xl font-semibold">{selectedUser.avgOrderValue}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Annual Purchases</p>
                    <p className="text-2xl font-semibold">{selectedUser.annualPurchases}</p>
                  </div>
                </>
              )}
              
              {isSalesManager(selectedUser) && (
                <>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Managed Accounts</p>
                    <p className="text-2xl font-semibold">{selectedUser.managedAccounts}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Monthly Target</p>
                    <p className="text-2xl font-semibold">{selectedUser.monthlyTarget}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Quarterly Performance</p>
                    <p className="text-2xl font-semibold">{selectedUser.quarterlyPerformance}</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderEditUser = () => {
    if (!selectedUser) return null;
    
    return (
      <Card className="border border-gray-200">
        <CardHeader className="flex items-center justify-between pb-2">
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleGoBack}
              className="bg-gray-100 hover:bg-gray-200"
            >
              <ChevronLeft className="mr-1 h-4 w-4" /> Back
            </Button>
            <CardTitle className="text-1xl md:text-2xl uppercase font-thin">
              Edit {selectedUser.name}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <Form {...editUserForm}>
            <form onSubmit={editUserForm.handleSubmit(handleEditUserSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    {isSalesManager(selectedUser) ? "Manager Information" : "Company Information"}
                  </h3>
                  <div className="space-y-4">
                    <FormField
                      control={editUserForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {isSalesManager(selectedUser) ? "Name" : "Company Name"}
                          </FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={editUserForm.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Status</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="active">Active</SelectItem>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="inactive">Inactive</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {(isBrand(selectedUser) || isBuyer(selectedUser)) && (
                      <FormField
                        control={editUserForm.control}
                        name="plan"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Plan</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select plan" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Basic">Basic</SelectItem>
                                <SelectItem value="Professional">Professional</SelectItem>
                                <SelectItem value="Premium">Premium</SelectItem>
                                <SelectItem value="Enterprise">Enterprise</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                    
                    {isSalesManager(selectedUser) && (
                      <FormField
                        control={editUserForm.control}
                        name="seniorityLevel"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Seniority Level</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select level" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Junior">Junior</SelectItem>
                                <SelectItem value="Mid-level">Mid-level</SelectItem>
                                <SelectItem value="Senior">Senior</SelectItem>
                                <SelectItem value="Lead">Lead</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                    
                    {(isBrand(selectedUser) || isBuyer(selectedUser)) && (
                      <FormField
                        control={editUserForm.control}
                        name="marketSegment"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Market Segment</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select market segment" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {activeTab === "brand" ? (
                                  <>
                                    <SelectItem value="Luxury Apparel">Luxury Apparel</SelectItem>
                                    <SelectItem value="Contemporary Fashion">Contemporary Fashion</SelectItem>
                                    <SelectItem value="Formal Wear">Formal Wear</SelectItem>
                                    <SelectItem value="Heritage Fashion">Heritage Fashion</SelectItem>
                                    <SelectItem value="Sustainable Fashion">Sustainable Fashion</SelectItem>
                                  </>
                                ) : (
                                  <>
                                    <SelectItem value="Department Stores">Department Stores</SelectItem>
                                    <SelectItem value="Boutiques">Boutiques</SelectItem>
                                    <SelectItem value="International Retail">International Retail</SelectItem>
                                    <SelectItem value="Outlet Retail">Outlet Retail</SelectItem>
                                    <SelectItem value="Luxury Retail">Luxury Retail</SelectItem>
                                  </>
                                )}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                    
                    {(isBrand(selectedUser) || isBuyer(selectedUser)) && (
                      <FormField
                        control={editUserForm.control}
                        name="website"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Website</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                    
                    {isSalesManager(selectedUser) && (
                      <FormField
                        control={editUserForm.control}
                        name="region"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Region</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select region" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="North America">North America</SelectItem>
                                <SelectItem value="Europe">Europe</SelectItem>
                                <SelectItem value="Asia Pacific">Asia Pacific</SelectItem>
                                <SelectItem value="Middle East">Middle East</SelectItem>
                                <SelectItem value="Latin America">Latin America</SelectItem>
                                <SelectItem value="Global">Global</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                    
                    <FormField
                      control={editUserForm.control}
                      name="activeSince"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Active Since</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                  <div className="space-y-4">
                    {(isBrand(selectedUser) || isBuyer(selectedUser)) && (
                      <FormField
                        control={editUserForm.control}
                        name="contactPerson"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Contact Person</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                    
                    <FormField
                      control={editUserForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={editUserForm.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
              
              <FormField
                control={editUserForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea className="min-h-32" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Performance Metrics</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {isBrand(selectedUser) && (
                    <>
                      <FormField
                        control={editUserForm.control}
                        name="productsCount"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Products Count</FormLabel>
                            <FormControl>
                              <Input type="number" {...field} value={field.value?.toString()} onChange={e => field.onChange(parseInt(e.target.value) || 0)} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={editUserForm.control}
                        name="avgOrderValue"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Average Order Value</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={editUserForm.control}
                        name="totalSales"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Total Sales</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </>
                  )}
                  
                  {isBuyer(selectedUser) && (
                    <>
                      <FormField
                        control={editUserForm.control}
                        name="storeCount"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Store Count</FormLabel>
                            <FormControl>
                              <Input type="number" {...field} value={field.value?.toString()} onChange={e => field.onChange(parseInt(e.target.value) || 0)} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={editUserForm.control}
                        name="avgOrderValue"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Average Order Value</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={editUserForm.control}
                        name="annualPurchases"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Annual Purchases</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </>
                  )}
                  
                  {isSalesManager(selectedUser) && (
                    <>
                      <FormField
                        control={editUserForm.control}
                        name="managedAccounts"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Managed Accounts</FormLabel>
                            <FormControl>
                              <Input type="number" {...field} value={field.value?.toString()} onChange={e => field.onChange(parseInt(e.target.value) || 0)} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={editUserForm.control}
                        name="monthlyTarget"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Monthly Target</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={editUserForm.control}
                        name="quarterlyPerformance"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Quarterly Performance</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </>
                  )}
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={handleGoBack}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="bg-black text-white"
                >
                  Save Changes
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    );
  };

  const renderAddUser = () => {
    return (
      <Card className="border border-gray-200">
        <CardHeader className="flex items-center justify-between pb-2">
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleGoBack}
              className="bg-gray-100 hover:bg-gray-200"
            >
              <ChevronLeft className="mr-1 h-4 w-4" /> Back
            </Button>
            <CardTitle className="text-1xl md:text-2xl uppercase font-thin">
              Add New {activeTab === "brand" ? "Brand" : activeTab === "buyer" ? "Buyer" : "Sales Manager"}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <Form {...addUserForm}>
            <form onSubmit={addUserForm.handleSubmit(handleAddUserSubmit)} className="space-y-6">
              {activeTab === "salesManager" ? (
                // Sales Manager specific form
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={addUserForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Full name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={addUserForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="Email address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={addUserForm.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Phone number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={addUserForm.control}
                    name="seniorityLevel"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Seniority Level</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select seniority level" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Junior">Junior</SelectItem>
                            <SelectItem value="Mid-level">Mid-level</SelectItem>
                            <SelectItem value="Senior">Senior</SelectItem>
                            <SelectItem value="Lead">Lead</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={addUserForm.control}
                    name="region"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Region</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select region" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="North America">North America</SelectItem>
                            <SelectItem value="Europe">Europe</SelectItem>
                            <SelectItem value="Asia Pacific">Asia Pacific</SelectItem>
                            <SelectItem value="Middle East">Middle East</SelectItem>
                            <SelectItem value="Latin America">Latin America</SelectItem>
                            <SelectItem value="Global">Global</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={addUserForm.control}
                    name="activeSince"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Active Since</FormLabel>
                        <FormControl>
                          <Input placeholder="Month Year" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={addUserForm.control}
                    name="managedAccounts"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Managed Accounts</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="0" {...field} value={field.value?.toString()} onChange={e => field.onChange(parseInt(e.target.value) || 0)} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={addUserForm.control}
                    name="monthlyTarget"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Monthly Target</FormLabel>
                        <FormControl>
                          <Input placeholder="$0K" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ) : (
                // Brand or Buyer form
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={addUserForm.control}
                    name="contactPerson"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Person</FormLabel>
                        <FormControl>
                          <Input placeholder="Full name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={addUserForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="Email address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={addUserForm.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Phone number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={addUserForm.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Company name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={addUserForm.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Website</FormLabel>
                        <FormControl>
                          <Input placeholder="Website URL" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={addUserForm.control}
                    name="marketSegment"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Market Segment</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select market segment" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {activeTab === "brand" ? (
                              <>
                                <SelectItem value="luxury">Luxury Apparel</SelectItem>
                                <SelectItem value="contemporary">Contemporary Fashion</SelectItem>
                                <SelectItem value="formal">Formal Wear</SelectItem>
                                <SelectItem value="heritage">Heritage Fashion</SelectItem>
                                <SelectItem value="sustainable">Sustainable Fashion</SelectItem>
                              </>
                            ) : (
                              <>
                                <SelectItem value="department">Department Stores</SelectItem>
                                <SelectItem value="boutiques">Boutiques</SelectItem>
                                <SelectItem value="international">International Retail</SelectItem>
                                <SelectItem value="outlet">Outlet Retail</SelectItem>
                                <SelectItem value="luxury-retail">Luxury Retail</SelectItem>
                              </>
                            )}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}
              
              <FormField
                control={addUserForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {activeTab === "salesManager" ? "Personal Bio" : "Company Description"}
                    </FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder={activeTab === "salesManager" ? "Brief bio and expertise" : "Brief description of the company"} 
                        className="min-h-32" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex justify-end space-x-3 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={handleGoBack}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="bg-black text-white"
                >
                  Send Invitation & Save
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <h1 className="text-4xl md:text-6xl uppercase font-thin mb-6">User Management</h1>
      
      <Tabs defaultValue="brand" className="w-full" onValueChange={(value) => setActiveTab(value as UserType)}>
        <TabsList className="mb-4">
          <TabsTrigger value="brand">Managed Brands</TabsTrigger>
          <TabsTrigger value="buyer">Managed Buyers</TabsTrigger>
          <TabsTrigger value="salesManager">Sales Managers</TabsTrigger>
        </TabsList>

        <TabsContent value="brand">
          {viewMode === "list" && renderListView("brand")}
          {viewMode === "view" && selectedUser && renderViewUser()}
          {viewMode === "edit" && selectedUser && renderEditUser()}
          {viewMode === "add" && renderAddUser()}
        </TabsContent>

        <TabsContent value="buyer">
          {viewMode === "list" && renderListView("buyer")}
          {viewMode === "view" && selectedUser && renderViewUser()}
          {viewMode === "edit" && selectedUser && renderEditUser()}
          {viewMode === "add" && renderAddUser()}
        </TabsContent>

        <TabsContent value="salesManager">
          {viewMode === "list" && renderListView("salesManager")}
          {viewMode === "view" && selectedUser && renderViewUser()}
          {viewMode === "edit" && selectedUser && renderEditUser()}
          {viewMode === "add" && renderAddUser()}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SalesUsers;

