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
  canCompleteOrder: false,
  canSeeFrontdeskNotes: false,
  canSeeDesignerNotes: false,
  canSeePrinterNotes: false,
  canReviewOrder: true,
  // Jobs
  canAddJobs: false,
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
  canEditOrderDetails: true,
  canStartDesign: true,
  canStartPrinting: false,
  canCreateNewOrder: false,
  canDeleteOrder: false,
  canCompleteOrder: true,
  canSeeFrontdeskNotes: true,
  canSeeDesignerNotes: false,
  canSeePrinterNotes: false,
  canReviewOrder: false,
  // Jobs
  canAddJobs: true,
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
  canCompleteOrder: true,
  canSeeFrontdeskNotes: true,
  canSeeDesignerNotes: true,
  canSeePrinterNotes: false,
  canReviewOrder: false,
  // Jobs
  canAddJobs: false,
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
