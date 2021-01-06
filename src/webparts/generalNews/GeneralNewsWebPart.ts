import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { sp } from "@pnp/sp";
import * as strings from 'GeneralNewsWebPartStrings';
import GeneralNews from './components/GeneralNews';
import { IGeneralNewsProps } from './components/IGeneralNewsProps';
import { PropertyFieldListPicker, PropertyFieldListPickerOrderBy } from '@pnp/spfx-property-controls/lib/PropertyFieldListPicker';

export interface IGeneralNewsWebPartProps {
  description: string;
  Title: string;
  Description: string;
  Link: string;
  BannerImageUrl: string;
  Created: string;
  sitePages: string;
}

export default class GeneralNewsWebPart extends BaseClientSideWebPart<IGeneralNewsWebPartProps> {
  
  public onInit(): Promise<void> {
    return super.onInit().then(_ => {
      sp.setup({
        spfxContext: this.context
      });
    });
  }



  public render(): void {
    const element: React.ReactElement<IGeneralNewsProps> = React.createElement(
      GeneralNews,
      {
        description: this.properties.description,
        Title: this.properties.Title,
        Description:  this.properties.Description,
        Link:  this.properties.Link,
        BannerImageUrl:  this.properties.BannerImageUrl,
        Created:  this.properties.Created,
        context: this.context,
        sitePages: this.properties.sitePages
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyFieldListPicker('SiteFolder', {
                  label: 'Select a list',
                  selectedList: this.properties.sitePages,
                  includeHidden: false,
                  orderBy: PropertyFieldListPickerOrderBy.Title,
                  disabled: false,
                  onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                  properties: this.properties,
                  context: this.context,
                  onGetErrorMessage: null,
                  webAbsoluteUrl: this.context.pageContext.web.absoluteUrl,
                  deferredValidationTime: 0,
                  key: 'listPickerFieldId'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
