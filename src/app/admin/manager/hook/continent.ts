import apiServices from "@/services/axios";

interface ContinentType {
  continentName: string;
}

// ✅ GET - Lấy danh sách Continents
export const getContinents = async () => {
  try {
    const response = await apiServices.get(`/continents`);
    return response;
  } catch (error) {
    console.error("Get continents error:", error);
    throw error;
  }
};

// ✅ POST - Thêm Continent
export const postContinent = async (props: ContinentType) => {
  try {
    const response = await apiServices.post(`/continents`, {
      continentName: props.continentName,
    });
    return response;
  } catch (error) {
    console.error("Post continent error:", error);
    throw error;
  }
};

// ✅ PUT - Cập nhật Continent
export const putContinent = async (props: ContinentType & { id: string | number }) => {
  try {
    const response = await apiServices.put(`/continents/${props.id}`, {
      continentName: props.continentName,
    });
    return response;
  } catch (error) {
    console.error("Put continent error:", error);
    throw error;
  }
};

// ✅ DELETE - Xóa Continent
export const deleteContinent = async (id: string | number) => {
  try {
    const response = await apiServices.delete(`/continents/${id}`);
    return response;
  } catch (error) {
    console.error("Delete continent error:", error);
    throw error;
  }
};

// ✅ GET - Tìm kiếm Continent theo tên
export const searchContinent = async (name: string) => {
  try {
    const response = await apiServices.get(`/continents/search`, {
      params: { name },
    });
    return response;
  } catch (error) {
    console.error("Search continent error:", error);
    throw error;
  }
};
