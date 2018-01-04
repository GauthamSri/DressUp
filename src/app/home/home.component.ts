import { Component, OnInit } from '@angular/core';
import { CommandService } from './command.service';
import { ToastrService } from '../shared/toastr.service';

@Component({
  templateUrl: './home.component.html',
  providers: [CommandService,ToastrService]
})

export class HomeComponent implements OnInit {
    
    cmds : String="";
    temps : any[] = [];
    selectedTemperature : String;
    parsedCmds : number[] = [];
    isInputValid : boolean;
    processedResult : String;

    constructor(private _commandService: CommandService, private _toastr: ToastrService)
    {

    }

    
    ngOnInit() {
        this.temps = [ { display : "HOT", id : 1},
                        {display : "COLD", id : 2}];
        this.selectedTemperature = "HOT"; //since its id is 1
        this.isInputValid = true;
        this.processedResult = "";
    }

    public process() {
        if(this.cmds=="" || !this.parseCmds(this.cmds))
        {
            this.isInputValid = false;
        }
        else
        {
            this._commandService.getProcessedResult(this.selectedTemperature,this.parsedCmds)
                .subscribe(
                (response: any) => {
                    this.processedResult = response.json();
                    this.isInputValid = true;
                },
                () => { 
                    this._toastr.error("Seems like some problem at the Server","Server Error!");
                });
        }       
    }

    onSelectionChange(temp : any) {
        this.selectedTemperature = temp.display;
    }

    parseCmds(cmdStr:String): Boolean {
        this.parsedCmds = [];
        var cmds = cmdStr.split(",");

        if(cmds.length == 0)
          return false;
     
        for (let cmd of cmds) {
                var res = parseInt(cmd); 
                if(!isNaN(res))
                {
                    this.parsedCmds.push(res);
                }
                else
                {
                    return false;
                }
            }

                return true;
    }


}