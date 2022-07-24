import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IActionsRequest, IActionsResponse } from '../../interfaces/actions/actions.interface';
import { IProductResponse } from '../../interfaces/products/products.interface';



@Injectable({
  providedIn: 'root'
})
export class ActionsService {

  private url = environment.BACKEND_URL;
  private api = { actions: `${this.url}actions` }

  constructor(private http: HttpClient) { }

   
  getAll(): Observable<IActionsResponse[]> {
    return this.http.get<IActionsResponse[]>(this.api.actions);
  }

  getAllByCategory(name: string): Observable<IActionsResponse[]> {
    return this.http.get<IActionsResponse[]>(`${this.api.actions}?category.path=${name}`);
  }


  getOne(id: number): Observable<IActionsResponse> {
    return this.http.get<IActionsResponse>(`${this.api.actions}/${id}`);
  }

  create(action: IActionsRequest): Observable<IActionsResponse> {
    return this.http.post<IActionsResponse>(this.api.actions, action);
  }  

  update(action: IActionsRequest, id: number): Observable<IActionsResponse> {
    return this.http.patch<IActionsResponse>(`${this.api.actions}/${id}`, action)
  }

  delete(id: number): Observable<void> {
     return this.http.delete<void>(`${this.api.actions}/${id}`)
  }

  resolve(route: ActivatedRouteSnapshot): Observable<IActionsResponse> {
    return  this.http.get<IActionsResponse>(`${this.api.actions}/${route.paramMap.get('id')}`);
  }
}
