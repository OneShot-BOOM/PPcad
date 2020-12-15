import { Graphics } from 'pixi.js';
import { DbObject } from './DbObject';
import { app } from "../core/app"
import * as type from "./type";
import { PixiDraw  } from "../core/PixiDrawFun"

export class Entity extends DbObject {

    public objectid: string | undefined;

    /*
    Accesses the ObjectId of the entity's owner, which must be a BlockTableRecord
    */
    //public BlockId: ObjectId | undefined;
    public BlockId: number | undefined;

    /*
    Accesses the name of the owner block.
    */
    public BlockName: string | undefined;

    /*
    Accesses the full true color information for the entity within an instance of Color.
    */
    public Color: type.Color | undefined;

    /*
    Accesses the AutoCAD color number of the entity
    */
    public ColorIndex: number | undefined;

    /*
    Accesses the name string in the LayerTableRecord object referenced by the entity.
    */
    public Layer: string | undefined;

    /*
    Accesses the ObjectId of the LayerTableRecord referenced by the entity.
    */
    // public LayerId: ObjectId | undefined;
    public LayerId: number | undefined;

    public draw(): Graphics 
    {
        return  PixiDraw.DrawPixi(this);
    }


}
