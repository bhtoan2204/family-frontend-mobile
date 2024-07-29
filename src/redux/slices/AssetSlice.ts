import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store';

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
  assets: [],

  selectedAsset: null,
};

const assetSlice = createSlice({
  name: 'asset',
  initialState,
  reducers: {
    setAsset: (state, action: PayloadAction<Asset[]>) => {
      state.assets = action.payload;
    },
    addAsset: (state, action: PayloadAction<Asset>) => {
      state.assets.push(action.payload);
    },
    selectAsset: (state, action: PayloadAction<Asset>) => {
      state.selectedAsset = action.payload;
    },
    clearSelectedAsset: state => {
      state.selectedAsset = null;
    },
    updateAsset: (state, action: PayloadAction<Asset>) => {
      const index = state.assets.findIndex(
        asset => asset.id_asset === action.payload.id_asset,
      );
      if (index !== -1) {
        state.assets[index] = action.payload;
      }
      state.selectedAsset = action.payload;
    },
    deleteAsset: (state, action: PayloadAction<number>) => {
      const index = state.assets.findIndex(
        asset => asset.id_asset === action.payload,
      );
      if (index !== -1) {
        state.assets.splice(index, 1);
      }
      state.selectedAsset = null;
    },
  },
});

export const {
  setAsset,
  addAsset,
  selectAsset,
  clearSelectedAsset,
  updateAsset,
  deleteAsset,
} = assetSlice.actions;
export const selectAssets = (state: RootState) => state.asset.assets;
export const selectSelectedAsset = (state: RootState) =>
  state.asset.selectedAsset;
export default assetSlice.reducer;
