import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface Asset {
  id_asset: number;
  id_family: number;
  name: string;
  description: string;
  value: string;
  purchase_date: string;
  image_url: string;
  created_at: string;
  updated_at: string;
}

interface AssetState {
  assets: Asset[];
  selectedAsset: Asset | null;
}

const initialState: AssetState = {
  assets: [
    {
      id_asset: 1,
      id_family: 96,
      name: 'Xe hơi',
      description: 'xe mua cho thằng con',
      value: '10000000000',
      purchase_date: '2023-01-15',
      image_url: 'https://storage.googleapis.com/famfund-bucket/expense/asset_bd94ba3a-b046-4a05-a260-890913e09df9_1720341189027_2024-lamborghini-revuelto-exterior.jpg',
      created_at: '2024-07-07T08:33:10.265Z',
      updated_at: '2024-07-07T08:38:18.236Z',
    },
  ],
  selectedAsset: null,
};

const assetSlice = createSlice({
  name: 'asset',
  initialState,
  reducers: {
    addAsset: (state, action: PayloadAction<Asset>) => {
      state.assets.push(action.payload);
    },
    selectAsset: (state, action: PayloadAction<Asset>) => {
      state.selectedAsset = action.payload;
    },
    clearSelectedAsset: (state) => {
      state.selectedAsset = null;
    },
    updateAsset: (state, action: PayloadAction<Asset>) => {
      const index = state.assets.findIndex(asset => asset.id_asset === action.payload.id_asset);
      if (index !== -1) {
        state.assets[index] = action.payload;
      }
    },
    deleteAsset: (state, action: PayloadAction<number>) => {
      const index = state.assets.findIndex(asset => asset.id_asset === action.payload);
      if (index !== -1) {
        state.assets.splice(index, 1);
      }
    },
  },
});

export const { addAsset, selectAsset, clearSelectedAsset, updateAsset, deleteAsset } = assetSlice.actions;
export const selectAssets = (state: RootState) => state.asset.assets;
export const selectSelectedAsset = (state: RootState) => state.asset.selectedAsset;
export default assetSlice.reducer;
