// Permissions: Front-desk
const frontdesk = {
  // Dashboard
  canSeeDashboard: true,
  // Order Management
  canSeeOrderManagement: true,
  canSeeOrderManagementList: true,
  canViewOrderDetails: true,
  canEditOrderDetails: true,
  canStartDesign: false,
  canStartPrinting: false,
  canCreateNewOrder: true,
  canDeleteOrder: true,
  // Jobs
  canDownloadCustomerDesignFile: false,
  canDownloadDesignerDesignFile: false,
  canAttachDesignFile: false,
  canAttachPrintFile: false,
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
  canEditOrderDetails: false,
  canStartDesign: true,
  canStartPrinting: false,
  canCreateNewOrder: false,
  canDeleteOrder: false,
  // Jobs
  canDownloadCustomerDesignFile: true,
  canDownloadDesignerDesignFile: false,
  canAttachDesignFile: true,
  canAttachPrintFile: false,
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
  canStartDesign: false,
  canStartPrinting: true,
  canCreateNewOrder: false,
  canDeleteOrder: false,
  // Jobs
  canDownloadCustomerDesignFile: false,
  canDownloadDesignerDesignFile: true,
  canAttachDesignFile: false,
  canAttachPrintFile: true,
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
