// Permissions: Front-desk
const frontdesk = {
  // Dashboard
  canSeeDashboard: true,
  // Order Management
  canSeeOrderManagement: true,
  canEditOrderDetails: false,
  canStartDesign: false,
  canStartPrinting: false,
  canCreateNewOrder: true,
  canDeleteOrder: true,
  canCompleteOrder: true,
  canSeeFrontdeskNotes: false,
  canSeeDesignerNotes: false,
  canSeePrinterNotes: false,
  canSeeCostsInReviewOrder: true,
  canSendForDesigning: true,
  // Jobs
  canAddJobs: false,
  canDownloadCustomerDesignFile: false,
  canDownloadDesignerDesignFile: false,
  canAttachDesignFile: false,
  canAttachPrintFile: false,
  canSendForPrinting: false,
  canMarkAsPrintingDone: false,
  canDeleteJobFromJobsList: false,
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
  canEditOrderDetails: true,
  canStartDesign: true,
  canStartPrinting: false,
  canCreateNewOrder: false,
  canDeleteOrder: false,
  canCompleteOrder: false,
  canSeeFrontdeskNotes: true,
  canSeeDesignerNotes: false,
  canSeePrinterNotes: false,
  canSeeCostsInReviewOrder: false,
  canSendForDesigning: false,
  canAddJobs: true,
  canDownloadCustomerDesignFile: true,
  canDownloadDesignerDesignFile: false,
  canAttachDesignFile: true,
  canAttachPrintFile: false,
  canSendForPrinting: true,
  canMarkAsPrintingDone: false,
  canDeleteJobFromJobsList: true,
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
  canEditOrderDetails: false,
  canStartDesign: false,
  canStartPrinting: true,
  canCreateNewOrder: false,
  canDeleteOrder: false,
  canCompleteOrder: true,
  canSeeFrontdeskNotes: true,
  canSeeDesignerNotes: true,
  canSeePrinterNotes: false,
  canSeeCostsInReviewOrder: false,
  canSendForDesigning: false,
  canAddJobs: false,
  canDownloadCustomerDesignFile: false,
  canDownloadDesignerDesignFile: true,
  canAttachDesignFile: false,
  canAttachPrintFile: true,
  canSendForPrinting: false,
  canMarkAsPrintingDone: true,
  canDeleteJobFromJobsList: false,
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
