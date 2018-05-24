// Permissions: Front-desk
const frontdesk = {
  // Dashboard
  canSeeDashboard: true,
  // Order Management
  canSeeOrderManagement: true,
  canSeeOrderManagementList: true,
  canViewOrderDetails: true,
  canEditOrderDetails: true,
  canCreateNewOrder: true,
  canDeleteOrder: true,
  // Jobs
  canDownloadCustomerDesignFile: false,
  canDownloadDesignerDesignFile: false,
  canDownloadPrinterDesignFile: false,
  canUploadCustomerDesignFile: false,
  canUploadDesignerDesignFile: false,
  canUploadPrinterDesignFile: false,
  canSendForPrinting: false,
  canMarkAsPrintingDone: false,
  // Invoice Management
  canSeeInvoiceManagement: true,
  canHandoverJob: true,
  canAcceptPayment: true,
  canGenerateInvoice: true
};

// Permissions: Designer
const designer = {
  // Dashboard
  canSeeDashboard: true,
  // Order Management
  canSeeOrderManagement: true,
  canSeeOrderManagementList: true,
  canViewOrderDetails: true,
  canEditOrderDetails: true,
  canCreateNewOrder: false,
  canDeleteOrder: false,
  // Jobs
  canDownloadCustomerDesignFile: true,
  canDownloadDesignerDesignFile: false,
  canDownloadPrinterDesignFile: false,
  canUploadCustomerDesignFile: false,
  canUploadDesignerDesignFile: true,
  canUploadPrinterDesignFile: false,
  canSendForPrinting: true,
  canMarkAsPrintingDone: false,
  // Invoice Management
  canSeeInvoiceManagement: false,
  canHandoverJob: false,
  canAcceptPayment: false,
  canGenerateInvoice: false
};

// Permissions: Printer
const printer = {
  // Dashboard
  canSeeDashboard: true,
  // Order Management
  canSeeOrderManagement: true,
  canSeeOrderManagementList: true,
  canViewOrderDetails: true,
  canEditOrderDetails: false,
  canCreateNewOrder: false,
  canDeleteOrder: false,
  // Jobs
  canDownloadCustomerDesignFile: false,
  canDownloadDesignerDesignFile: true,
  canDownloadPrinterDesignFile: false,
  canUploadCustomerDesignFile: false,
  canUploadDesignerDesignFile: false,
  canUploadPrinterDesignFile: true,
  canSendForPrinting: false,
  canMarkAsPrintingDone: true,
  // Invoice Management
  canSeeInvoiceManagement: false,
  canHandoverJob: false,
  canAcceptPayment: false,
  canGenerateInvoice: false
};

// Exports
export default {
  frontdesk,
  designer,
  printer
};
