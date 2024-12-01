import { useEntity } from './useEntity';
import {
  getAllVendors,
  getVendorById,
  createVendor,
  updateVendor,
  deleteVendor,
} from '../../../services/Vendor.service';
import { Vendor } from '../../../models/Vendor.type';

export const useVendor = (vendorId?: string) => {
  return useEntity<Vendor>(
    'vendors',
    getAllVendors,
    getVendorById,
    createVendor,
    updateVendor,
    deleteVendor,
    vendorId
  );
};
