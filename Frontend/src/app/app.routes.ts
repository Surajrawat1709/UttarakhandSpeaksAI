import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './LoginPage/login/login.component';
import { LoginLayoutComponent } from './LoginPage/login-layout/login-layout.component';
import { SelectCharacterComponent } from './Select-character-page/select-character/select-character.component';
import { MessagePanelComponent } from './ChatPage/message-panel/message-panel.component';
import { SelectCharacterMainComponent } from './Select-character-page/select-character-main/select-character-main.component';
import { MessageComponent as MCP, MessageComponent } from './ChatPage/message/message.component';
import { SelectMultiplecharMainComponent } from './Multiple-character/select-multiplechar-main/select-multiplechar-main.component';
import { GenerateImageMainComponent } from './generate-image-page/generate-image-main/generate-image-main.component';
import { PaymentGatewayComponent } from './payment-gateway/payment-gateway.component';
export const routes: Routes = [{
  path:'',
  redirectTo : 'home',
  pathMatch:'full'
},
{
  path:'home',
  component: SelectMultiplecharMainComponent
},
{
  path:'login',
  component: LoginComponent
},
{
  path: 'chatpage',
  component: MessageComponent
},
{
  path: 'payment',
  component: PaymentGatewayComponent
},
{
  path: 'selectVisuals',
  component: SelectCharacterMainComponent
},
{
  path:'selectCharacter',
  component:SelectMultiplecharMainComponent
},
{
  path:'generateImg',
  component:GenerateImageMainComponent
},
{
  path: 'chatpagepankaj',
  component: MCP
},
{
  path: 'api',
  component: MCP
},
{
  path:'',
  component: LoginLayoutComponent,
  children: [

  ]
}
];

