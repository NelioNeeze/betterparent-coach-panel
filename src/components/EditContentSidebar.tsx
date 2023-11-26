import type { NextPage } from "next";
import styles from "../styles/components/edit-content-sidebar.module.css";
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { IFormContentType } from "../interfaces/IFormContent";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../services/categoryService";

type IRightSidebarType = {
    showAge?: boolean;
    showDeleteButton?: boolean;
    showLocation?: boolean;
    showCategory?: boolean;
    formContent?: IFormContentType;
    onValueChange: (value: any) => void; 
    onDeleteClick?: (value: any) => void; 
    onSaveClick?: (updatedContent: any) => void; 
};
  
const EditContentSidebar: NextPage<IRightSidebarType> = ({
    showAge = false,
    showDeleteButton= false,
    showLocation = false,
    showCategory = false,
    onValueChange,
    onSaveClick,
    onDeleteClick,
    formContent,
}) => {

    var select = (<></>)

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        onValueChange({ ...formContent, [name]: value });
    };

    if(showCategory) {
        const { data: categories } = useQuery({
            queryKey: ["categories"],
            queryFn: () => getCategories(),
        })

        select = (
            <FormControl>
                <InputLabel id="demo-simple-select-label">Filtern nach ...</InputLabel>
                <Select
                    id="category"
                    label="Filtern nach ..."
                    defaultValue="Alles"
                    name="category"
                    value={formContent?.category}
                    onChange={(e) => {
                        const selectedCategory = e.target.value;
                        onValueChange?.(selectedCategory);
                    }}
                >
                    <MenuItem value="Alles">Alle Kategorien</MenuItem>
                    {categories?.map((category: any) => (
                        <MenuItem 
                            value={category.attributes.name}
                            key={category.id}
                            >{category.attributes.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        )
    }

    return (
        <div className={styles.rightSideBar}>
            <div className={styles.rightInputContainer}>
                { showCategory &&
                    select
                }
                { showLocation &&
                    <TextField
                        fullWidth
                        placeholder="Ort"
                        onChange={(e) => { 
                            handleInputChange(e) 
                          }} 
                        name="location"
                        value={formContent?.location}
                    ></TextField>
                }
                { showAge &&
                    <div className={styles.ageContainer}>
                        <TextField
                            fullWidth
                            placeholder="Alter"
                            onChange={(e) => { 
                                handleInputChange(e) 
                              }} 
                            name="ageStart"
                            value={formContent?.ageStart}
                        ></TextField>
                        <p>bis</p>
                        <TextField
                            fullWidth
                            name="ageEnd"
                            onChange={(e) => { 
                                handleInputChange(e) 
                              }} 
                            placeholder="Alter"
                            value={formContent?.ageEnd}
                        ></TextField>
                    </div>
                }
            </div>
            <div className={styles.rightSideButtons}>
                <Button variant="contained" onClick={onSaveClick}>Veröffentlichen</Button>
                { showDeleteButton &&
                    <Button 
                        variant="contained" 
                        onClick={onDeleteClick}
                        >Löschen
                    </Button>
                }
            </div>
        </div>
    );
};

export default EditContentSidebar;
