import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IActionsResponse } from 'src/app/shared/interfaces/actions/actions.interface';
import { ActionsService } from 'src/app/shared/services/actions/actions.service';
import { deleteObject, getDownloadURL, percentage, ref, Storage, uploadBytesResumable } from '@angular/fire/storage';

@Component({
  selector: 'app-admin-actions',
  templateUrl: './admin-actions.component.html',
  styleUrls: ['./admin-actions.component.scss']
})
export class AdminActionsComponent implements OnInit {

  public adminActions: Array<IActionsResponse> = [];
  public actionsForm!: FormGroup;

  public editStatus = false;
  public uploadPercent!: number;
  public isUploaded = false;
  private currentCategoryId = 0;

  public openForm = false;

  constructor(
    private fb: FormBuilder,
    private actionsService: ActionsService,
    private storage: Storage
  ) { }

  

  ngOnInit(): void {
    this.initActionForm();
    this.loadActions();
  }

  openFormCheck(): void {
    this.openForm = true;
  }

  closeForm(): void{
    this.openForm = false;
    this.editStatus = false;
    this.actionsForm.reset();
    this.isUploaded = false;
    this.uploadPercent = 0;
  }

  initActionForm(): void {
    this.actionsForm = this.fb.group({
      date: [new Date(), Validators.required],
      name: [null, Validators.required],
      title: [null, Validators.required],
      description: [null, Validators.required],
      imagePath: [null, Validators.required]
    });
  }

  loadActions(): void {
    this.actionsService.getAll().subscribe(data => {
      this.adminActions = data;
    })
  }

  addAction(): void {
    if(this.editStatus){
      this.actionsService.update(this.actionsForm.value, this.currentCategoryId).subscribe(() => {
        this.loadActions();
        console.log('edit now');
        
      })
    }else{
      this.actionsService.create(this.actionsForm.value).subscribe(() => {
        this.loadActions();
        console.log('add now');
        this.actionsForm.patchValue({ 
          date: new Date() 
        })
      })
    }
    this.editStatus = false;
    this.actionsForm.reset();
    this.isUploaded = false;
    this.uploadPercent = 0;
    this.openForm = false;
  }

  editAction(action: IActionsResponse): void {
    this.actionsForm.patchValue({
      date: action.date,
      name: action.name,
      title: action.title,
      description: action.description,
      imagePath: action.imagePath
    });
    this.editStatus = true;
    this.currentCategoryId = action.id;
    this.isUploaded = true;
    this.openForm = true;
  }


  deleteAction(action: IActionsResponse): void {
    if(confirm('Are you sure?')){
      this.actionsService.delete(action.id).subscribe(() => {
        this.loadActions();
      })
    }
  }

  upload(event: any): void {
    const file = event.target.files[0];
    this.uploadFile('images', file.name, file)
      .then(data => {
        this.actionsForm.patchValue({
          imagePath: data
        })
        this.isUploaded = true;
      })
      .catch(err => {
        console.log(err);
      })
  }

  async uploadFile(folder: string, name: string, file: File | null): Promise<string> {
    const path = `${folder}/${name}`;
    let url = '';
    if(file) {
      try {
        const storageRef = ref(this.storage, path)
        const task = uploadBytesResumable(storageRef, file);
        percentage(task).subscribe(data => {
          this.uploadPercent = data.progress;
        })
        await task;
        url = await getDownloadURL(storageRef);
      } catch (e: any) {
        console.log('error', e);
      }
    }else {
      console.log('wrong format');
    }
    return Promise.resolve(url);
  }

  deleteImage(): void {
    const task = ref(this.storage, this.valueByControl('imagePath'));
    deleteObject(task).then(() => {
      console.log('file deleted');
      this.isUploaded = false;
      this.uploadPercent = 0;
      this.actionsForm.patchValue({
        imagePath: null
      })
    })
  }

  valueByControl(control: string): string {
    return this.actionsForm.get(control)?.value;
  }
}


