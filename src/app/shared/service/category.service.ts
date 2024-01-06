import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Constants } from "../../utils/constants";

@Injectable({
  providedIn: "root"
})
export class CategoryService {
  constructor(private http: HttpClient) {}
  getAuthorization() {
    return btoa(localStorage.getItem("jwt"));
  }

  createGroup(data) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.post(Constants.BACKEND_URL + "/category-group", data, {
      headers: headers
    });
  }

  createCategory(data) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.post(Constants.BACKEND_URL + "/category", data, {
      headers: headers
    });
  }

  deleteGroup(idProduct) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.delete(
      Constants.BACKEND_URL + "/category-group/" + idProduct,
      { headers: headers }
    );
  }

  deleteCategory(idCategory) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.delete(
      Constants.BACKEND_URL + "/category/" + idCategory,
      { headers: headers }
    );
  }

  getAllCategory(group) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.get(Constants.BACKEND_URL + "/category?group=" + group, {
      headers: headers
    });
  }

  getCategoryNames() {
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.get(Constants.BACKEND_URL + "/category/categoryNames", {
      headers
    });
  }

  getOne(idCategory) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.get(Constants.BACKEND_URL + "/category/" + idCategory, {
      headers: headers
    });
  }

  getListCategoryGroup() {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.get(Constants.BACKEND_URL + "/category-group/list-admin", {
      headers: headers
    });
  }
  getListCategoryAllGroup() {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.get(Constants.BACKEND_URL + "/category-group/list-all", {
      headers: headers
    });
  }

  getFilterGroup(search, page, quantity) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.get(Constants.BACKEND_URL + "/category-group/search", {
      headers: headers,
      params: { search: search, page: page, quantity: quantity }
    });
  }
  getGroupById(idGroupCategory) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.get(
      Constants.BACKEND_URL + "/category-group/" + idGroupCategory,
      { headers: headers }
    );
  }

  getTableCategory() {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.get(Constants.BACKEND_URL + "/category/table-category", {
      headers: headers
    });
  }

  searchFriendlyURL(friendly_url, _id?) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.get(Constants.BACKEND_URL + "/category/friendly_url/" + friendly_url + '/' + _id, {
      headers: headers,
    });
  }

  updateCategory(data, idCategory) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.put(
      Constants.BACKEND_URL + "/category/" + idCategory,
      data,
      { 
        headers: headers,
      }
    );
  }

  updateManyCategories(data: [any]) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.put(
      Constants.BACKEND_URL + "/category/update-many",
      data,
      { headers: headers }
    );
  } 

  updateGroup(data, idGroup) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.put(
      Constants.BACKEND_URL + "/category-group/" + idGroup,
      data,
      { headers: headers }
    );
  }

  updateManyCategoryGroup(data: [any]) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.put(
      Constants.BACKEND_URL + "/category-group/update-many",
      data,
      { headers: headers }
    );
  } 

  getCategoriesFiltersByCategoryArray(categoryArray) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    const params = new HttpParams().set(
      "idCategories",
      JSON.stringify(categoryArray)
    );
    return this.http.get(
      Constants.BACKEND_URL + "/category/filter-categories",
      { headers, params }
    );
  }

  filterCategoryFromCategoryGroup(search, groupId) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.get(Constants.BACKEND_URL + "/category/search/" + groupId, {
      headers: headers,
      params: {
        search: JSON.stringify(search)
      }
    });
  }

  filterCategoryGroupWithCategory(search, groupId) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.get(Constants.BACKEND_URL + "/category/search-group/" + groupId, {
      headers: headers,
      params: {
        search: JSON.stringify(search)
      }
    });
  }

  getListCategory() {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.get(Constants.BACKEND_URL + "/category/find-all-list", {
      headers: headers
    });
  }

  getCategoryFilters(id) {
    const headers = new HttpHeaders()
    .set("Content-type", "application/json")
    .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.get(Constants.BACKEND_URL + "/category/category-filters/" + id, {
      headers: headers,
    });
  }
}
