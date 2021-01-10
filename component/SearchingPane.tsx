import React from 'react';
import {StylesProvider} from '@material-ui/core/styles';
import {
    Button,
    Select,
    MenuItem,
    Chip,
    TextField,
    FormControl
} from "@material-ui/core";
import {useForm, Controller} from "react-hook-form";
import styled from 'styled-components';
import InputLabel from '@material-ui/core/InputLabel';
import {useRouter} from "next/router";

import {
    COST_TO,
    DIMENSION_FROM,
    DIMENSION_TO,
    DISPOSITION,
    EQUIPMENT,
    LOCATION,
    COMMISSION,
    COST_FROM,
    SEARCH,
    ErrorMap,
    UNEQUIPPED,
    PARTIALLY_EQUIPPED,
    FULLY_EQUIPPED, NO_COMMISSION,
} from "../constant/constants";

const dispositions = [
    "1kk",
    "1+1",
    "2kk",
    "2+1",
    "3kk",
    "3+1",
    "4kk",
    "4+1",
    "5kk",
    "5+1"
];

const StyledForm = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
  width: 100%;
  min-height: 60px;
  margin: 5px;
  @media (max-width: 768px) {
    flex-direction: column;
  };
`;

const StyledMenuItem = styled(MenuItem)`
  min-height: 32px;
`

const StyledFormControl = styled(FormControl)`
  min-width: 120px;
`;

const StyledButton = styled(Button)`
  max-height: 50px;
`;


export default function SearchingPane() {
    const [disposition, setDisposition] = React.useState<string[]>([]);
    const [location, setLocation] = React.useState('');
    const [equipment, setEquipment] = React.useState('');
    const [commission, setCommission] = React.useState('');
    const {handleSubmit, setValue, errors, control, getValues} = useForm({
        mode: "onChange",
        reValidateMode: "onChange",
    });
    const router = useRouter();

    return (
        <StylesProvider injectFirst>
            <StyledForm
                onSubmit={handleSubmit(data => {
                    const setData = getValues();
                    router.push(
                        {
                            pathname: '/',
                            query: setData,
                        },
                        undefined,
                        {
                            shallow: false,
                        },
                    );
                })}
            >
                <Controller
                    as={
                        <TextField
                            label={COST_FROM}
                            type="number"
                            error={!!errors["cost-from"]}
                            helperText={errors["cost-from"] && errors["cost-from"]["message"]}
                        />
                    }
                    name="cost-from"
                    defaultValue=""
                    control={control}
                    rules={{
                        required: false,
                        pattern: {
                            value: /^([1-9]{1}[\d]{0,2}(\.[\d]{3})*(,[\d]{0,2})?|[1-9]{1}[\d]{0,}(,[\d]{0,2})?|0(,[\d]{0,2})?|(,[\d]{1,2})?)$/,
                            message: ErrorMap.numberFieldError,
                        }
                    }}
                />
                <Controller
                    as={
                        <TextField
                            label={COST_TO}
                            type="number"
                            error={!!errors["cost-to"]}
                            helperText={errors["cost-to"] && errors["cost-to"]["message"]}
                        >
                        </TextField>
                    }
                    name="cost-to"
                    defaultValue=""
                    control={control}
                    rules={{
                        required: false,
                        pattern: {
                            value: /^([1-9]{1}[\d]{0,2}(\.[\d]{3})*(,[\d]{0,2})?|[1-9]{1}[\d]{0,}(,[\d]{0,2})?|0(,[\d]{0,2})?|(,[\d]{1,2})?)$/,
                            message: ErrorMap.numberFieldError,
                        }
                    }}
                />
                <Controller
                    as={
                        <StyledFormControl>
                            <InputLabel id="location-label-id">{LOCATION}</InputLabel>
                            <Select
                                labelId="location-label-is"
                                id="label-id"
                                value={location}
                                onChange={(event: any) => {
                                    setLocation(event.target.value as string);
                                    setValue("location", event.target.value);
                                }}
                            >
                                <StyledMenuItem value=""> </StyledMenuItem>
                                <MenuItem value="Praha">Praha</MenuItem>
                                <MenuItem value="Brno">Brno</MenuItem>
                                <MenuItem value="Ostrava">Ostrava</MenuItem>
                                <MenuItem value="Znojmo">Znojmo</MenuItem>
                            </Select>
                        </StyledFormControl>
                    }
                    name="location"
                    defaultValue=""
                    control={control}
                />
                <Controller
                    as={
                        <TextField
                            label={DIMENSION_FROM}
                            type="number"
                            error={!!errors["dimension-from"]}
                            helperText={errors["dimension-from"] && errors["dimension-from"]["message"]}
                        >
                        </TextField>
                    }
                    name="dimension-from"
                    rules={{
                        required: false,
                        pattern: {
                            value: /^([1-9]{1}[\d]{0,2}(\.[\d]{3})*(,[\d]{0,2})?|[1-9]{1}[\d]{0,}(,[\d]{0,2})?|0(,[\d]{0,2})?|(,[\d]{1,2})?)$/,
                            message: ErrorMap.numberFieldError,
                        }
                    }}
                    defaultValue=""
                    control={control}
                />
                <Controller
                    as={
                        <TextField
                            label={DIMENSION_TO}
                            type="number"
                            error={!!errors["dimension-to"]}
                            helperText={errors["dimension-to"] && errors["dimension-to"]["message"]}
                        >
                        </TextField>
                    }
                    rules={{
                        required: false,
                        pattern: {
                            value: /^([1-9]{1}[\d]{0,2}(\.[\d]{3})*(,[\d]{0,2})?|[1-9]{1}[\d]{0,}(,[\d]{0,2})?|0(,[\d]{0,2})?|(,[\d]{1,2})?)$/,
                            message: ErrorMap.numberFieldError,
                        }
                    }}
                    name="dimension-to"
                    defaultValue=""
                    control={control}
                />
                <Controller
                    as={
                        <StyledFormControl>
                            <InputLabel id="commission-label">{COMMISSION}</InputLabel>
                            <Select
                                labelId="commission-label"
                                id="commission-input"
                                value={commission}
                                onChange={(event: any) => {
                                    setCommission(event.target.value as string);
                                    setValue("commission", event.target.value);
                                }}
                            >
                                <StyledMenuItem value=""> </StyledMenuItem>
                                <MenuItem value={COMMISSION}>{COMMISSION}</MenuItem>
                                <MenuItem value={NO_COMMISSION}>{NO_COMMISSION}</MenuItem>
                            </Select>
                        </StyledFormControl>
                    }
                    name="commission"
                    defaultValue=""
                    control={control}
                />
                <Controller
                    as={

                        <StyledFormControl>
                            <InputLabel id="equipment-label">{EQUIPMENT}</InputLabel>
                            <Select
                                labelId="equipment-label"
                                id="equipment-input"
                                value={equipment}
                                onChange={(event: any) => {
                                    setEquipment(event.target.value as string);
                                    setValue("equipment", event.target.value);
                                }}
                            >
                                <StyledMenuItem value=""> </StyledMenuItem>
                                <MenuItem value={FULLY_EQUIPPED}>{FULLY_EQUIPPED}</MenuItem>
                                <MenuItem value={PARTIALLY_EQUIPPED}>{PARTIALLY_EQUIPPED}</MenuItem>
                                <MenuItem value={UNEQUIPPED}>{UNEQUIPPED}</MenuItem>
                            </Select>
                        </StyledFormControl>
                    }
                    name="equipment"
                    control={control}
                    defaultValue=""
                />
                <Controller
                    render={props => (
                        <StyledFormControl>
                            <InputLabel id="disposition-label-id">{DISPOSITION}</InputLabel>
                            <Select
                                labelId="disposition-label-id"
                                fullWidth
                                id="disposition-id"
                                multiple
                                value={disposition}
                                onChange={(event: any) => {
                                    setDisposition(event.target.value as string[]);
                                    setValue("disposition", event.target.value);
                                }}
                                renderValue={selected => (
                                    <div>
                                        {(selected as string[]).map(value => (
                                            <Chip key={value} label={value}/>
                                        ))}
                                    </div>
                                )}
                            >
                                {dispositions.map((element) => (
                                    <MenuItem key={element} value={element}>
                                        {element}
                                    </MenuItem>
                                ))}
                            </Select>
                        </StyledFormControl>
                    )}
                    name="disposition"
                    control={control}
                    defaultValue=""
                    multiple
                />
                <StyledButton
                    type="submit"
                    variant="contained"
                    color="primary"
                >
                    {SEARCH}
                </StyledButton>
            </StyledForm>
        </StylesProvider>
    );
}
